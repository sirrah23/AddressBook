const dbConn = require('../data/dbConn.js')
const User = require('./user.js')

class Contact{

    constructor(name, address, relationship, phoneNumber, user, id, createdAt){
        this.name = name
        this.address = address
        this.relationship = relationship
        this.phoneNumber = phoneNumber
        this.user = user
        this.id = id
        this.createdAt= createdAt
    }

    async save(){
        const data = {
            name: this.name,
            address: this.address,
            relationship: this.relationship,
            phoneNumber: this.phoneNumber,
            userId: this.user.id,
        }
        if(!this.id){
            const res = await dbConn('contact')
                                .insert(data)
                                .returning(['id', 'created_at'])
            this.id = res[0].id
            this.createdAt = res[0].created_at
        } else {
            await dbConn('contact')
                    .where({id: this.id})
                    .update(data)
        }
        return this
    }

    static async fetchById(id){
        const contact = await dbConn('contact')
                                .where({'id': id})
        if(contact.length == 0) return null
        const user = await User.fetchById(contact[0].userId)
        if(!user) return null
        return new Contact(
                            contact[0].name, 
                            contact[0].address, 
                            contact[0].relationship, 
                            contact[0].phoneNumber, 
                            user, 
                            contact[0].id, 
                            contact[0].createdAt
                        )
    }

    toJSON(){
        return {
            name: this.name,
            address: this.address,
            relationship: this.relationship,
            phoneNumber: this.phoneNumber,
            id: this.id,
            createdAt: this.createdAt
        }
    }

}

module.exports = Contact