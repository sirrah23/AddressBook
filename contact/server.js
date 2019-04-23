const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const contactRouter = require('./routes/api/v1/contact.js')
const initTables = require('./data/init.js')
const logger = require('./util/logger.js')

initTables()
    .then(() => {    
        app.use(bodyParser.json())
        app.use('/api/v1/contact', contactRouter)
        app.listen(port, () => logger.info(`App is listening on port ${port}`))
    })
    .catch(e => {
        console.log(`Something went wrong: \n\t${e}`)
        process.exit(1)
    })

