const authServiceConnMock = require('../mock/authServiceConnMock.js')
const authServiceConn = require('../connection/authServiceConn')

//TODO: This class is kind of useless...and so is the factory
//          ...should I get rid of it?
class Authorizer{

    constructor(authServiceConn){
        this.authServiceConn = authServiceConn
    }

    async authorizationCheck(token){
        return await this.authServiceConn.sendValidateRequest(token)
    }
}

function authorizerFactory(env){
    switch(env){
        case 'test':
            return new Authorizer(authServiceConnMock)
        default:
            return new Authorizer(authServiceConn)
    }
}

async function authorizationMiddleware(req, res, next){
    if(!req.headers.authorization)
        return res.status(403).json({errorFlag:1, message: 'Unauthorized request!'})
    const tokenMatch = /bearer (.+)/.exec(req.headers.authorization)
    if(!tokenMatch)
        return res.status(403).json({errorFlag:1, message: 'Unauthorized request!'})
    const token = tokenMatch[1]
    const authorizer = authorizerFactory(process.env.mode)
    const authCheckResult = await authorizer.authorizationCheck(token)
    if(authCheckResult.errorFlag === 1)
        return res.status(403).json({errorFlag:1, message: 'Unauthorized request!'})
    req.authDataPayload = authCheckResult.payload
    return next()
}

module.exports = authorizationMiddleware
