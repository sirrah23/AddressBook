module.exports = (table) => {
    table.increments()
    table.string('name')
    table.string('address')
    table.string('relationship')
    table.string('phoneNumber')
    table.integer('userId').unsigned()
    table.foreign('userId').references('id').on('user')
    table.timestamps('created_at', true)
}

