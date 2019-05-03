const dbConn = require('../data/dbConn.js')

class User{

    constructor(uuid, id, createdAt){
        this.uuid = uuid
        this.id = id                //optional
        this.createdAt = createdAt  //optional
    }

    async save(){
        const res = await dbConn('user')
                            .insert({
                                'uuid': this.uuid
                            })
                            .returning(['id', 'created_at'])
        this.id = res[0].id
        this.createdAt = res[0].created_at
        return this
    }

     static async fetch(uuid){  //TODO: rename this to fetchByUUID
        const res = await dbConn('user')
                        .where({'uuid': uuid})
        if(res.length == 0) return null
        return new User(res[0].uuid, res[0].id, res[0].created_at)
    }

    static async fetchById(id){
        const res = await dbConn('user')
                        .where({'id': id})
        if(res.length == 0) return null
        return new User(res[0].uuid, res[0].id, res[0].created_at)
    }

}

module.exports = User