module.exports = (table) => {
    table.increments()
    table.uuid('uuid')
    table.timestamps()
}
