const app = require('./app.js')
const initTables = require('./data/init.js')
const logger = require('./util/logger.js')

const port = 3000

initTables()
    .then(() => {    
        app.listen(port, () => logger.info(`App is listening on port ${port}`))
    })
    .catch(e => {
        console.log(`Something went wrong: \n\t${e}`)
        process.exit(1)
    })

