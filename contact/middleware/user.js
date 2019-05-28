const User = require('../model/user.js')
const logger = require('../util/logger.js')

async function userAddMiddleware(req, res, next){
    logger.info(`START user add middleware for ${JSON.stringify(req.authDataPayload)}`)
    if(!req.authDataPayload){
        logger.info(`ABORT user add middleware`)
        return res.status(500).json({errorFlag: 1, errorMsg: 'Something went wrong'})
    }
    const uuid = req.authDataPayload.user_id
    if(!uuid){
        logger.info(`ABORT user add middleware`)
        return res.status(500).json({errorFlag: 1, errorMsg: 'Something went wrong'})
    }
    let user = await User.fetch(uuid)
    if(user !== null){
        req.body.userUUID = user.uuid
        logger.info(`END user add middleware - user already exists`)
        return next()
    }
    user = new User(uuid)
    await user.save()
    req.body.userUUID = user.uuid
    logger.info(`END user add middleware - added new user`)
    return next()
}

module.exports = userAddMiddleware
