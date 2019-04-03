module.exports = (table) => {
    table.increments()
    table.uuid('uuid').notNullable()
    table.timestamps('created_at', true)
}
