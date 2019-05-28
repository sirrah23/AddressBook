const sinon = require('sinon')
const httpMocks = require('node-mocks-http')
const authorizationMiddleware = require('../middleware/authorizer.js')
const authServiceConnMock = require('../mock/authServiceConnMock.js')
const userAddMiddleware = require('../middleware/user.js')
const User = require('../model/user.js')
const wipeTables = require('../data/wipe.js')
const dbConn = require('../data/dbConn.js')

afterAll(async done => {
    await wipeTables()
    await dbConn.destroy() //TODO: Remove the need for this by properly cleaning up database connections
    done()
})

test('succesfully authorize a request with a valid token', async done => {
    const testUsername = 'user001'
    const token = await authServiceConnMock.generateAuthTokenRequest(testUsername)
    const nextSpy = sinon.spy()
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    req.headers.authorization = `bearer ${token}`
    await authorizationMiddleware(req, res, nextSpy)
    expect(!!req.authDataPayload).toBe(true)
    expect(req.authDataPayload.username).toBe(testUsername)
    expect(!!req.authDataPayload.user_id).toBe(true)
    expect(nextSpy.calledOnce).toBe(true)
    done()
})

test('fail to validate an invalid token', async done => {
    const invalidToken = 'randomTextThatIsNotAToken'
    const nextSpy = sinon.spy()
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    req.header.authorization = `bearer ${invalidToken}`
    await authorizationMiddleware(req, res, nextSpy)
    const jsonResponse = res._getJSONData()
    expect(!!req.authDataPayload).toBe(false)
    expect(res.statusCode).toBe(403)
    expect(jsonResponse.errorFlag).toBe(1)
    expect(jsonResponse.errorMsg).toBe('Unauthorized request!')
    expect(nextSpy.calledOnce).toBe(false)
    done()
})

test('succesfully add a user to the database via the contents of a successfully validated auth token payload', async done => {
    const testUsername = 'user001'
    const token = await authServiceConnMock.generateAuthTokenRequest(testUsername)
    const nextSpyAuth = sinon.spy()
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    req.headers.authorization = `bearer ${token}`
    await authorizationMiddleware(req, res, nextSpyAuth)
    const nextSpyUser = sinon.spy()
    await userAddMiddleware(req, res, nextSpyUser)
    expect(nextSpyUser.calledOnce).toBe(true)
    expect(!!req.body.userUUID).toBe(true)
    const user = await User.fetch(req.body.userUUID)
    expect(user !== null).toBe(true)
    expect(user.uuid).toBe(req.body.userUUID)
    // expect(user.username).toBe(testUsername)
    done()
})

test('successfully move on if the user already exists in the database', async done => {
    const testUsername = 'user001'
    const token = await authServiceConnMock.generateAuthTokenRequest(testUsername)
    const nextSpyAuth = sinon.spy()
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    req.headers.authorization = `bearer ${token}`
    await authorizationMiddleware(req, res, nextSpyAuth)
    const user = new User(req.authDataPayload.user_id)
    user.save()
    const nextSpyUser = sinon.spy()
    await userAddMiddleware(req, res, nextSpyUser)
    expect(nextSpyUser.calledOnce).toBe(true)
    done()
})