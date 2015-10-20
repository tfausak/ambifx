'use strict';

module.exports = {
  up: (knex) => {
    return knex.schema.createTable('recordings', (table) => {
      table.uuid('guid')
        .notNullable()
        .primary();
      table.timestamp('created_at')
        .defaultTo(knex.raw('now()'))
        .notNullable();
      table.timestamp('deleted_at')
        .index();
      table.float('latitude')
        .notNullable();
      table.float('longitude')
        .notNullable();
    });
  },

  down: (knex) => {
    return knex.schema.dropTable('recordings');
  }
};
