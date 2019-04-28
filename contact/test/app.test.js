const app = require('../app.js')
const User = require('../model/user.js')
const initTables = require('../data/init.js')
const wipeTables = require('../data/wipe.js')
const uuid = require('uuid/v4')
const request = require('supertest')
const dbConn = require('../data/dbConn.js')

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
    const userId = uuid()
    const u1 = new User(userId)
    await u1.insert()
    const res = await request(app)
                        .post('/api/v1/contact')
                        .set('Accept', 'application/json')
                        .send({userUUID: u1.uuid, contact: {name: 'John Smith'}})
    expect(res.status).toBe(201)
    expect(res.body.errorFlag).toBe(0)
    expect(res.body.message.includes(u1.uuid)).toBe(true)
    expect(res.body.contact.name).toBe('John Smith')
    done()
})

test('fail to create a contact for a non-user', async done => {
    const res = await request(app)
                        .post('/api/v1/contact')
                        .set('Accept', 'application/json')
                        .send({contact: {name: 'John Smith'}})
    expect(res.status).toBe(400)
    expect(res.body.errorFlag).toBe(1)
    expect(res.body.message).toBe('Invalid user authorization')
    done()
})

test('fail to create a contact for a non-user', async done => {
    const userId = uuid()
    const u1 = new User(userId)
    await u1.insert()
    const res = await request(app)
                        .post('/api/v1/contact')
                        .set('Accept', 'application/json')
                        .send({userUUID: u1.uuid})
    expect(res.status).toBe(400)
    expect(res.body.errorFlag).toBe(1)
    expect(res.body.message).toBe('No contact data provided')
    done()
})