/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
	await knex.schema.createTable('posts', (table) => {
    table.increments('id')
    table.string('title').notNullable()
    table.text('contents', 'longtext').notNullable()
    table.date('date').defaultTo(knex.fn.now(6)).notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
	await knex.raw('DROP TABLE posts CASCADE')
};
