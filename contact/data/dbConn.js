const config = require('../config/config.js')
const logger = require("../util/logger.js")

logger.info(`Creating connection to database ${config.database.database}`)

function buildDBConnectionString(dbConfig){ 
    return `${dbConfig.type}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
}

module.exports = require('knex')({
    client: config.database.client,
    connection: buildDBConnectionString(config.database)
})
