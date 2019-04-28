const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const contactRouter = require('./routes/api/v1/contact.js')

app.use(bodyParser.json())
app.use('/api/v1/contact', contactRouter)

module.exports = app