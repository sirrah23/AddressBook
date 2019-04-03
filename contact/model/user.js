const dbConn = require('../data/dbConn.js')

class User{

    constructor(uuid, id=null, createdAt=null){
        this.uuid = uuid
        this.id = id
        this.createdAt = createdAt
    }

    async insert(){
        const res = await dbConn('user')
                            .insert({
                                'uuid': this.uuid
                            })
                            .returning(['id', 'created_at'])
        this.id = res[0].id
        this.createdAt = res[0].created_at
        return this
    }

}

module.exports = User