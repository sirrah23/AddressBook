const User = require('../model/user.js')
const Contact = require('../model/contact.js')

const ContactController = {

    async createNewContact(userUUID, name, address, relationship, phoneNumber,){
        const user = await User.fetch(userUUID)
        if (!user){
            return {
                errorFlag: 1,
                message: `User with uuid ${userUUID} was not found`
            }
        }
        let newContact = new Contact(name, address, relationship, phoneNumber, user)
        await newContact.insert()
        return {errorFlag: 0, message: `Contact ${newContact.id} has been inserted into the database for user ${user.uuid}`}
    }

}

module.exports = ContactController