//TODO: Make the connection string configurable
module.exports = require('knex')({
    client: 'pg',
    connection: 'postgresql://postgres:mysecretpassword@localhost:5432/test'
})

