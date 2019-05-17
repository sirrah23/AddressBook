const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')
const secretKey = 'mysecret'   //hard-coded secret key for development/testing purposes

function generateAuthTokenRequest(username){
    const uuid = uuidv4()
    const payload = {username: username, user_id: uuid}
    return jwt.sign(payload, secretKey)
}

function sendValidateRequest(token){
    const payload = jwt.verify(token, secretKey)
    return {error: 0, errorMsg: '', payload}
}

module.exports = {
    generateAuthTokenRequest,
    sendValidateRequest,
}
