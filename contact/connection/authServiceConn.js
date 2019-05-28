const request = require('request-promise')
const logger = require('../util/logger.js')

async function generateAuthTokenRequest(token){
    throw new Error('Not implemented...not needed for production usage')
}

async function sendValidateRequest(token){
    logger.info(`START token validation for ${token}`)
    const options = {
        method: 'POST',
        uri: 'http://auth_node:8000/validateAuthToken',
        body: {
            token
        },
        json: true
    };
    try {
        const responseJSONContent = await request(options)
        logger.info(`END token validation, success`)
        if(responseJSONContent.error === 1){
            return {errorFlag: 1, errorMsg: 'Invalid token'}
        } else {
            return {errorFlag: 0, errorMsg: '', payload: responseJSONContent.payload}
        }
    } catch (err){
        logger.warn(`Something went wrong: ${err}`)
        return {errorFlag: 1, errorMsg: 'Invalid token'}
    }
}

module.exports = {
    sendValidateRequest,
}
