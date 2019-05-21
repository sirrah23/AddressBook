const sinon = require('sinon')
const httpMocks = require('node-mocks-http')
const authorizationMiddleware = require('../middleware/authorizer.js')
const authServiceConnMock = require('../mock/authServiceConnMock.js')

test('succesfully authorize a request with a valid token', async done => {
    const testUsername = 'user001'
    const token = authServiceConnMock.generateAuthTokenRequest(testUsername)
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