const express = require('express')
const router = express.Router()
const ContactController = require('../../../controller/user.js')

router.post('/', async (req, res) => {
    const userUUID = req.body.userUUID
    const contact = req.body.contact
    if(!userUUID){
        return res.status(400).json({errorFlag: 1, message: "Invalid user authorization"})
    }
    if(!contact){
        return res.status(400).json({errorFlag: 1, message: "No contact data provided"})
    }
    const contactCreateRes = await ContactController.createNewContact(userUUID, contact.name, contact.address, contact.relationship, contact.phoneNumber)
    if (contactCreateRes.errorFlag === 0){
        return res.status(201).json(contactCreateRes)
    } else {
        return res.status(400).json(contactCreateRes)
    }
})

module.exports = router