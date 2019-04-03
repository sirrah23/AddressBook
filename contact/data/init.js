const knex = require('knex')
const dbConn = require('./dbConn.js')
const contactSchema = require('../schema/contact.js')
const userSchema = require('../schema/user.js')

const initTables = async () => {
    //TODO: This should be a loop instead
    const hasUserTable = await dbConn.schema.hasTable('user')
    if(!hasUserTable){
        console.log('Initializing the user table')
        await dbConn.schema.createTable('user', userSchema)
    } else {
        console.log('User table already exists, skipping initialization')
    }
    const hasContactTable = await dbConn.schema.hasTable('contact')
    if(!hasContactTable){
        console.log('Initializing the contact table')
        await dbConn.schema.createTable('contact', contactSchema)
    } else {
        console.log('Contact table already exists, skipping initialization')
    }
    
}

module.exports = initTables