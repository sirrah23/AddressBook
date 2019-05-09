const User = require('../model/user.js')
const Contact = require('../model/contact.js')

const ContactController = {


    async getContact(userUUID, contactID){
        
        if(!userUUID){
            return{
                statusCode: 400,
                responseBody:{
                    errorFlag: 1, 
                    message: "Invalid user authorization",
                    contact: {},
                }
            }
        }
        
        if(!contactID){
            return{
                statusCode: 400,
                responseBody:{
                    errorFlag: 1, 
                    message: "No contact id provided", 
                    contact: {},
                }
            }
        }

        const user = await User.fetch(userUUID)

        if (!user){
            return {
                statusCode: 400,
                responseBody:{
                    errorFlag: 1,
                    message: `User with uuid ${userUUID} was not found`,
                    contact: {},
                },
            }
        }

        const contact = await Contact.fetchById(contactID)

        if(!contact){
            return {
                statusCode: 400,
                responseBody:{
                    errorFlag: 1,
                    message: `Contact with id ${contactID} was not found`,
                    contact: {}
                }
            }
        }

        if(contact.user.uuid !== userUUID){
            return {
                statusCode: 400,
                responseBody:{
                    errorFlag: 1,
                    message: `Contact with id ${contactID} does not belong to user ${userUUID}`,
                    contact: {}
                }
            }
        }

        return {
            statusCode: 200,
            responseBody:{
                errorFlag: 0,
                message: `Contact ${contact.id} has been retrieved for user ${user.uuid}`,
                contact: contact.toJSON()    
            }
        }
    },

    async createNewContact(userUUID, contact){
        if(!userUUID){
            return{
                statusCode: 400,
                responseBody:{
                    errorFlag: 1, 
                    message: "Invalid user authorization", 
                    contact: {} 
                }
            }
            
        }
        if(!contact){
            return{
                statusCode: 400,
                responseBody: {
                    errorFlag: 1,
                    message: "No contact data provided",
                    contact: {}
                }
            }
        }
        
        const user = await User.fetch(userUUID)
        if (!user){
            return {
                statusCode: 400,
                responseBody:{
                    errorFlag: 1,
                    message: `User with uuid ${userUUID} was not found`    
                }
            }
        }

        const newContact = new Contact(contact.name, contact.address, contact.relationship, contact.phoneNumber, user)
        await newContact.save()
        return {
            statusCode:201,
            responseBody:{
                errorFlag: 0, 
                message: `Contact ${newContact.id} has been inserted into the database for user ${user.uuid}`,
                contact: newContact.toJSON(),
            }
        }
    },

    async updateContact(userUUID, contactID, contactData){
        if(!userUUID){
            return{
                statusCode: 400,
                responseBody: {
                    errorFlag: 1,
                    message: "Invalid user authorization",
                    contact: {}
                }
            }
        }

        if(!contactData){
            return{
                statusCode: 400,
                responseBody: {
                    errorFlag: 1,
                    message: "No contact data provided",
                    contact: {}
                }
            }    
        }

        if(!contactID){
            return{
                statusCode: 400,
                responseBody:{
                    errorFlag: 1,
                    message: "No contact id provided",
                    contact: {}
                }
            }
        }

        const user = await User.fetch(userUUID)

        const contact = await Contact.fetchById(contactID)
        
        if(!contact){
            return {
                statusCode: 400,
                responseBody:{
                    errorFlag: 1,
                    message: `Contact with id ${contactID} was not found`
                }
            }
        }

        if(contact.user.uuid !== userUUID){
            return {
                statusCode: 400,
                responseBody:{
                    errorFlag: 1,
                    message: `Contact with id ${contactID} does not belong to user ${userUUID}`
                }
            }
        }

        if('name' in contactData) contact.name = contactData.name
        if('address' in contactData) contact.address = contactData.address
        if('relationship' in contactData) contact.relationship = contactData.relationship
        if('phoneNumber' in contactData) contact.phoneNumber = contactData.phoneNumber

        await contact.save()
        return {
            statusCode: 200,
            responseBody:{
                errorFlag: 0, 
                message: `Contact ${contact.id} has been updated for user ${user.uuid}`,
                contact: contact.toJSON(),
            }
        }
    },

    async deleteContact(userUUID, contactID){
        const user = await User.fetch(userUUID)

        const contact = await Contact.fetchById(contactID)

        if(!contact){
            return {
                errorFlag: 1,
                message: `Contact with id ${contactID} was not found`
            }
        }

        if(contact.user.uuid !== userUUID){
            return{
                errorFlag: 1,
                message: `Contact with id ${contactID} does not belong to user ${userUUID}` 
            }
        }

        const deleteSuccess = await contact.remove()

        if(deleteSuccess){
            return {
                errorFlag: 0,
                message: `Contact ${contact.id} has been deleted for user ${user.uuid}`,
            }
        } else {
            return {
                errorFlag: 1,
                message: `Contact ${contact.id} for user ${user.uuid} could not be deleted`,
            }
        }
    }
}

module.exports = ContactController