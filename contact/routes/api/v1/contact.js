const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    console.log('Creating contact...')
    res.sendStatus(201)
})

module.exports = router