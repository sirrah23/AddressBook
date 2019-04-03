const dbConn = require('../data/dbConn.js')

class Contact{

    constructor(name, address, relationship, phoneNumber, user, id=null, createdAt=null){
        this.name = name
        this.address = address
        this.relationship = relationship
        this.phoneNumber = phoneNumber
        this.user = user
        this.id = id
        this.createdAt= createdAt
    }

    async insert(){
        const res = await dbConn('contact')
                            .insert({
                                'name': this.name,
                                'address': this.address,
                                'relationship': this.relationship,
                                'phoneNumber': this.phoneNumber,
                                'userId': this.user.id,
                            })
                            .returning(['id', 'created_at'])
        this.id = res[0].id
        this.createdAt = res[0].created_at
        return this
    }

}

module.exports = Contact