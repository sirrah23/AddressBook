const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const authMiddleware = require('./middleware/authorizer.js')
const userMiddleware = require('./middleware/user.js')

const contactRouter = require('./routes/api/v1/contact.js')

app.use(bodyParser.json())
app.use(authMiddleware)
app.use(userMiddleware)
app.use('/api/v1/contact', contactRouter)

module.exports = app
