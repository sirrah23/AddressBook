const express = require('express')
const router = express.Router()
const ContactController = require('../../../controller/user.js')
const logger = require('../../../util/logger.js')
const authMiddleware = require('../../../middleware/authorizer.js')
const userMiddleware = require('../../../middleware/user.js')

router.use(authMiddleware)
router.use(userMiddleware)

router.get('/', async(req, res) => {
    logger.info(`Start contacts GET with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contactsGetRes = await ContactController.getContactsForUser(userUUID)
    logger.info(`End contacts GET with parameters: ${JSON.stringify(req.body)}`)
    return res.status(contactsGetRes.statusCode).json(contactsGetRes.responseBody)
})

router.get('/:contactID', async(req, res) => {
    logger.info(`Start contact GET with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contactID = req.params.contactID
    const contactGetRes = await ContactController.getContact(userUUID, contactID)
    logger.info(`End contact GET with response: ${JSON.stringify(contactGetRes)}`)
    return res.status(contactGetRes.statusCode).json(contactGetRes.responseBody)
})

router.post('/', async (req, res) => {
    logger.info(`Start contact post with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contact = req.body.contact
    const contactCreateRes = await ContactController.createNewContact(userUUID, contact)
    logger.info(`End contact POST with response: ${JSON.stringify(contactCreateRes)}`)
    return res.status(contactCreateRes.statusCode).json(contactCreateRes.responseBody)
})

router.put('/:contactID', async(req, res) => {
    logger.info(`Start contact PUT with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contactID = req.params.contactID
    const contact = req.body.contact
    const contactCreateRes = await ContactController.updateContact(userUUID, contactID, contact)
    logger.info(`End contact PUT with response: ${JSON.stringify(contactCreateRes)}`)
    return res.status(contactCreateRes.statusCode).json(contactCreateRes.responseBody)
})

router.delete('/:contactID', async(req, res) => {
    logger.info(`Start contact DELETE with parameters: ${JSON.stringify(req.body)}`)
    const userUUID = req.body.userUUID
    const contactID = req.params.contactID
    const contactDeleteRes = await ContactController.deleteContact(userUUID, contactID)
    logger.info(`End contact DELETE with response: ${JSON.stringify(contactDeleteRes)}`)
    return res.status(contactDeleteRes.statusCode).json(contactDeleteRes.responseBody)
})

module.exports = router