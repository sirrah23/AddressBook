const app = require('../app.js')
const Contact = require('../model/contact.js')
const initTables = require('../data/init.js')
const wipeTables = require('../data/wipe.js')
const request = require('supertest')
const dbConn = require('../data/dbConn.js')
const authServiceConnMock = require('../mock/authServiceConnMock.js')

async function generateUserToken(username){
    const token = await authServiceConnMock.generateAuthTokenRequest(username)
    return token
}

beforeAll(async done => {
    await initTables()
    done()
})

afterAll(async done => {
    await wipeTables()
    await dbConn.destroy() //TODO: Remove the need for this by properly cleaning up database connections
    done()
})

test('successfully create a contact', async done => {
    const token = await generateUserToken('user001')
    const res = await request(app)
                        .post('/api/v1/contact')
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send({contact: {name: 'John Smith'}})
    expect(res.status).toBe(201)
    expect(res.body.errorFlag).toBe(0)
    expect(res.body.contact.name).toBe('John Smith')
    done()
})

test('fail to create a contact for an invalid auth token', async done => {
    const token = 'notarealtoken.faketoken'
    const res = await request(app)
                        .post('/api/v1/contact')
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send({contact: {name: 'John Smith'}})
    expect(res.status).toBe(403)
    expect(res.body.errorFlag).toBe(1)
    expect(res.body.message).toBe('Unauthorized request!')
    done()
})

test('fail to create a contact when no data is provided', async done => {
    const token = await generateUserToken('user001')
    const res = await request(app)
                        .post('/api/v1/contact')
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send({})
    expect(res.status).toBe(400)
    expect(res.body.errorFlag).toBe(1)
    expect(res.body.message).toBe('No contact data provided')
    done()
})

test('successfully update an existing contact', async done => {
    const token = await generateUserToken('user001')
    const insertedContactRes = await request(app)
                                        .post('/api/v1/contact')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `bearer ${token}`)
                                        .send({contact: {name: 'John Smith'}})
    const res = await request(app)
                        .put(`/api/v1/contact/${insertedContactRes.body.contact.id}`)
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send({contact: {relationship: 'Father'}})
    expect(res.status).toBe(200)
    expect(res.body.errorFlag).toBe(0)
    expect(res.body.contact.id).toBe(insertedContactRes.body.contact.id)
    expect(res.body.contact.name).toBe('John Smith')
    expect(res.body.contact.relationship).toBe('Father')
    done()
})

test('fail to update an non-existent contact', async done => {
    const token = await generateUserToken('user001')
    const insertedContactRes = await request(app)
                                        .post('/api/v1/contact')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `bearer ${token}`)
                                        .send({contact: {name: 'John Smith'}})
    const res = await request(app)
                        .put(`/api/v1/contact/${insertedContactRes.body.contact.id+1}`)
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send({contact: {relationship: 'father'}})
    expect(res.status).toBe(400)
    expect(res.body.errorFlag).toBe(1)
    expect(res.body.message).toBe(`Contact with id ${insertedContactRes.body.contact.id+1} was not found`)
    done()
})

test('fail to update a contact that doesn\'t belong to you', async done => {
    const tokenOne = await generateUserToken('user001')
    const tokenTwo = await generateUserToken('user002')
    const insertedContactRes = await request(app)
                                        .post('/api/v1/contact')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `bearer ${tokenOne}`)
                                        .send({contact: {name: 'John Smith'}})
    const res = await request(app)
                        .put(`/api/v1/contact/${insertedContactRes.body.contact.id}`)
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${tokenTwo}`)
                        .send({contact: {relationship: 'father'}})
    expect(res.status).toBe(400)
    expect(res.body.errorFlag).toBe(1)
    expect(res.body.message).toMatch(/Contact with id .* does not belong to user .*/)
    done()
})

test('successfully delete an existing contact', async done => {
    const token = await generateUserToken('user001')
    const insertedContactRes = await request(app)
                                        .post('/api/v1/contact')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `bearer ${token}`)
                                        .send({contact: {name: 'John Smith'}})
    const res = await request(app)
                        .delete(`/api/v1/contact/${insertedContactRes.body.contact.id}`)
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send({})
    expect(res.status).toBe(200)
    expect(res.body.errorFlag).toBe(0)
    const c1 = await Contact.fetchById(insertedContactRes.body.contact.id)
    expect(c1).toBe(null)
    done()
})

test('fail to delete a non-existent contact', async done => {
    const token = await generateUserToken('user001')
    const insertedContactRes = await request(app)
                                        .post('/api/v1/contact')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `bearer ${token}`)
                                        .send({contact: {name: 'John Smith'}})
    const res = await request(app)
                        .delete(`/api/v1/contact/${insertedContactRes.body.contact.id+1}`)
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send({})
    expect(res.status).toBe(400)
    expect(res.body.errorFlag).toBe(1)
    expect(res.body.message).toMatch(/Contact with id .* was not found/)
    done() 
})

test('successfully retrieve an existing contact', async done => {
    const token = await generateUserToken('user001')
    const insertedContactRes = await request(app)
                                        .post('/api/v1/contact')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `bearer ${token}`)
                                        .send({contact: {name: 'John Smith', relationship: 'Father'}})
    const res = await request(app)
                        .get(`/api/v1/contact/${insertedContactRes.body.contact.id}`)
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send()
    expect(res.status).toBe(200)
    expect(res.body.errorFlag).toBe(0)
    expect(res.body.contact.id).toBe(insertedContactRes.body.contact.id)
    expect(res.body.contact.name).toBe('John Smith')
    expect(res.body.contact.relationship).toBe('Father')
    done()
})

test('fail to retrieve a non-existent contact', async done => {
    const token = await generateUserToken('user001')
    const insertedContactRes = await request(app)
                                        .post('/api/v1/contact')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `bearer ${token}`)
                                        .send({contact: {name: 'John Smith', relationship: 'Father'}})
    const res = await request(app)
                        .get(`/api/v1/contact/${insertedContactRes.body.contact.id+1}`)
                        .set('Accept', 'application/json')
                        .set('Authorization', `bearer ${token}`)
                        .send({})
    expect(res.status).toBe(400)
    expect(res.body.errorFlag).toBe(1)
    expect(res.body.message).toMatch(/Contact with id .* was not found/)
    done()
})

test('successfully retrieve all contacts for a given user', async done => {
    const token = await generateUserToken('user001')
    
    const c1 = {name: 'John Smith', relationship: 'Father', address: 'Hogwarts'}
    const c2 = {name: 'John Titor', relationship: 'Brother', address: '221B Baker St.' }
    
    await request(app)
            .post('/api/v1/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `bearer ${token}`)
            .send({contact: c1})
    await request(app)
            .post('/api/v1/contact')
            .set('Accept', 'application/json')
            .set('Authorization', `bearer ${token}`)
            .send({contact: c2})
    const allInsertedContacts = await request(app)
                                            .get('/api/v1/contact')
                                            .set('Accept', 'application/json')
                                            .set('Authorization', `bearer ${token}`)
                                            .send({})
    expect(allInsertedContacts.status).toBe(200)
    expect(allInsertedContacts.body.errorFlag).toBe(0)
    expect(allInsertedContacts.body.contacts.length).toBe(2)
    
    const firstContact = {}
    firstContact.name = allInsertedContacts.body.contacts[0].name
    firstContact.relationship = allInsertedContacts.body.contacts[0].relationship
    firstContact.address = allInsertedContacts.body.contacts[0].address
    
    const secondContact = {}
    secondContact.name = allInsertedContacts.body.contacts[1].name
    secondContact.relationship = allInsertedContacts.body.contacts[1].relationship
    secondContact.address = allInsertedContacts.body.contacts[1].address

    expect([firstContact, secondContact]).toContainEqual(c1)
    expect([firstContact, secondContact]).toContainEqual(c2)
    done()
})

test('successfully retrieve no contacts for a given user', async done => {
    const token = await generateUserToken('user001')


    const allInsertedContacts = await request(app)
                                            .get('/api/v1/contact')
                                            .set('Accept', 'application/json')
                                            .set('Authorization', `bearer ${token}`)
                                            .send({})
    expect(allInsertedContacts.status).toBe(200)
    expect(allInsertedContacts.body.errorFlag).toBe(0)
    expect(allInsertedContacts.body.contacts.length).toBe(0)
    done()
})