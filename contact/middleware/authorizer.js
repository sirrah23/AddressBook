const authServiceConnMock = require('../mock/authServiceConnMock.js')

//TODO: This class is kind of useless...and so is the factory
//          ...should I get rid of it?
class Authorizer{

    constructor(authServiceConn){
        this.authServiceConn = authServiceConn
    }

    async authorizationCheck(token){
        return this.authServiceConn.sendValidateRequest(token)
    }
}

function authorizerFactory(env){
    switch(env){
        case 'test':
            return new Authorizer(authServiceConnMock)
        default:
            throw new Error('In progress...')
    }
}

function authorizationMiddleware(req, res, next){
    if(!req.headers.authorization)
        return res.status(403).json({errorFlag:1, errorMsg: 'Unauthorized request!'})
    const tokenMatch = /bearer (\w)/.exec(req.headers.authorization)
    if(!tokenMatch)
        return res.status(403).json({errorFlag:1, errorMsg: 'Unauthorized request!'})
    const token = tokenMatch[1]
    const authorizer = authorizerFactory(process.env.mode)
    const authCheckResult = authorizer.authorizationCheck(token)
    if(authCheckResult.errorFlag === 1)
        return res.status(403).json({errorFlag:1, errorMsg: 'Unauthorized request!'})
    req.authDataPayload = authCheckResult.payload
    return next()
}

module.exports = authorizationMiddleware
