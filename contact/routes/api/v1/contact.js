const express = require('express')
const router = express.Router()
const ContactController = require('../../../controller/user.js')
const logger = require('../../../util/logger.js')

router.post('/', async (req, res) => {
    logger.info(`Start contact post with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contact = req.body.contact
    if(!userUUID){
        logger.warn('Aborting, a user uuid was not found, check auth middleware')
        return res.status(400).json({errorFlag: 1, message: "Invalid user authorization", contact: {}})
    }
    if(!contact){
        logger.warn('Aborting, the caller did not supply any contact data to post')
        return res.status(400).json({errorFlag: 1, message: "No contact data provided", contact: {}})
    }
    const contactCreateRes = await ContactController.createNewContact(userUUID, contact.name, contact.address, contact.relationship, contact.phoneNumber)
    if (contactCreateRes.errorFlag === 0){
        logger.info(`Success: ${contactCreateRes.message}`)
        return res.status(201).json(contactCreateRes)
    } else {
        logger.warn(`Failure: ${contactCreateRes.message}`)
        return res.status(400).json(contactCreateRes)
    }
})

router.put('/', async(req, res) => {
    logger.info(`Start contact put with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contact = req.body.contact
    if(!userUUID){
        logger.warn('Aborting, a user uuid was not found, check auth middleware')
        return res.status(400).json({errorFlag: 1, message: "Invalid user authorization", contact: {}})
    }
    if(!contact){
        logger.warn('Aborting, the caller did not supply any contact data')
        return res.status(400).json({errorFlag: 1, message: "No contact data provided", contact: {}})
    }
    if(!contact.id){
        logger.warn('Aborting, the caller did not supply a contact id')
        return res.status(400).json({errorFlag: 1, message: "No contact id provided", contact: {}})
    }
    const data = Object.assign({}, contact)
    delete data.id
    const contactCreateRes = await ContactController.updateContact(userUUID, contact.id, data)
    if (contactCreateRes.errorFlag === 0){
        logger.info(`Success: ${contactCreateRes.message}`)
        return res.status(200).json(contactCreateRes)
    } else {
        logger.warn(`Failure: ${contactCreateRes.message}`)
        return res.status(400).json(contactCreateRes)
    }
})

module.exports = router