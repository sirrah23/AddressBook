const configBuilder = require('./configBuilder.js')
const config = configBuilder(process.env.mode)
module.exports = config