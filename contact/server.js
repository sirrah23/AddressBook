const express = require('express')
const app = express()
const port = 3000

const contactRouter = require('./routes/api/v1/contact.js')
const initTables = require('./data/init.js')

initTables()
    .then(() => {    
        app.use('/api/v1/contact', contactRouter)
        app.listen(port, () => console.log(`App is listening on port ${port}`))
    })
    .catch(e => {
        console.log(`Something went wrong: \n\t${e}`)
        process.exit(1)
    })

