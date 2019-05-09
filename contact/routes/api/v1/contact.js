const express = require('express')
const router = express.Router()
const ContactController = require('../../../controller/user.js')
const logger = require('../../../util/logger.js')

router.get('/:contactID', async(req, res) => {
    logger.info(`Start contact get with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contactID = req.params.contactID
    const contactGetRes = await ContactController.getContact(userUUID, contactID)
    logger.info(`End contact get with response: ${JSON.stringify(contactGetRes)}`)
    return res.status(contactGetRes.statusCode).json(contactGetRes.responseBody)
})

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

router.put('/:contactId', async(req, res) => {
    logger.info(`Start contact put with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contactId = req.params.contactId
    const contact = req.body.contact
    if(!userUUID){
        logger.warn('Aborting, a user uuid was not found, check auth middleware')
        return res.status(400).json({errorFlag: 1, message: "Invalid user authorization", contact: {}})
    }
    if(!contact){
        logger.warn('Aborting, the caller did not supply any contact data')
        return res.status(400).json({errorFlag: 1, message: "No contact data provided", contact: {}})
    }
    if(!contactId){
        logger.warn('Aborting, the caller did not supply a contact id')
        return res.status(400).json({errorFlag: 1, message: "No contact id provided", contact: {}})
    }
    const contactCreateRes = await ContactController.updateContact(userUUID, contactId, contact)
    if (contactCreateRes.errorFlag === 0){
        logger.info(`Success: ${contactCreateRes.message}`)
        return res.status(200).json(contactCreateRes)
    } else {
        logger.warn(`Failure: ${contactCreateRes.message}`)
        return res.status(400).json(contactCreateRes)
    }
})

router.delete('/:contactId', async(req, res) => {
    logger.info(`Start contact delete with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contactId = req.params.contactId
    if(!userUUID){
        logger.warn('Aborting, a user uuid was not found, check auth middleware')
        return res.status(400).json({errorFlag: 1, message: "Invalid user authorization", contact: {}})
    }
    if(!contactId){
        logger.warn('Aborting, the caller did not supply a contact id')
        return res.status(400).json({errorFlag: 1, message: "No contact id provided", contact: {}})
    }
    const contactDeleteRes = await ContactController.deleteContact(userUUID, contactId)
    if (contactDeleteRes.errorFlag === 0){
        logger.info(`Success: ${contactDeleteRes.message}`)
        return res.status(200).json(contactDeleteRes)
    } else {
        logger.warn(`Failure: ${contactDeleteRes.message}`)
        return res.status(400).json(contactDeleteRes)
    }
})

module.exports = router