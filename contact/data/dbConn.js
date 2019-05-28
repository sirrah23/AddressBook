const logger = require("../util/logger.js")
const mode = process.env.mode

//TODO: Change this code once we have real configuration management
let db
let host = 'contact_db'

switch(mode){
    case "prod":
        db = "contact_prod"
        break
    case "test":
        db = "contact_test"
        host = 'localhost'
        break
    case "dev":
        db = "contact_dev"
        break
    default:
        db = "contact_dev"
        break
}

logger.info(`Creating connection to database ${db}`)

module.exports = require('knex')({
    client: 'pg',
    connection: `postgresql://postgres:mysecretpassword@${host}:5432/${db}`
})
