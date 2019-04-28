const logger = require('../util/logger.js')
const dbConn = require('./dbConn.js')

const wipeTables = async () => {
    logger.info('Wiping all tables')
    const tables = ['contact', 'user'] //TODO: Put this information in one place
    for (table of tables){
        await dbConn(table).del()
    }
}

module.exports = wipeTables
