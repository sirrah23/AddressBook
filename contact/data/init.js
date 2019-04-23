const knex = require('knex')
const logger = require('../util/logger.js')
const dbConn = require('./dbConn.js')
const contactSchema = require('../schema/contact.js')
const userSchema = require('../schema/user.js')

const initTables = async () => {
    //TODO: This should be a loop instead
    const hasUserTable = await dbConn.schema.hasTable('user')
    if(!hasUserTable){
        logger.info('Initializing the user table')
        await dbConn.schema.createTable('user', userSchema)
    } else {
        logger.info('User table already exists, skipping initialization')
    }
    const hasContactTable = await dbConn.schema.hasTable('contact')
    if(!hasContactTable){
        logger.info('Initializing the contact table')
        await dbConn.schema.createTable('contact', contactSchema)
    } else {
        logger.info('Contact table already exists, skipping initialization')
    }
    
}

module.exports = initTables