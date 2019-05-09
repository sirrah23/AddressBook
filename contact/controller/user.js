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

    async createNewContact(userUUID, name, address, relationship, phoneNumber,){
        const user = await User.fetch(userUUID)
        if (!user){
            return {
                errorFlag: 1,
                message: `User with uuid ${userUUID} was not found`
            }
        }
        let newContact = new Contact(name, address, relationship, phoneNumber, user)
        await newContact.save()
        return {
            errorFlag: 0, 
            message: `Contact ${newContact.id} has been inserted into the database for user ${user.uuid}`,
            contact: newContact.toJSON(),
        }
    },

    async updateContact(userUUID, contactID, data){
        const user = await User.fetch(userUUID)

        const contact = await Contact.fetchById(contactID)
        
        if(!contact){
            return {
                errorFlag: 1,
                message: `Contact with id ${contactID} was not found`
            }
        }

        if(contact.user.uuid !== userUUID){
            return {
                errorFlag: 1,
                message: `Contact with id ${contactID} does not belong to user ${userUUID}`
            }
        }

        if('name' in data) contact.name = data.name
        if('address' in data) contact.address = data.address
        if('relationship' in data) contact.relationship = data.relationship
        if('phoneNumber' in data) contact.phoneNumber = data.phoneNumber

        await contact.save()
        return {
            errorFlag: 0, 
            message: `Contact ${contact.id} has been updated for user ${user.uuid}`,
            contact: contact.toJSON(),
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