
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('username').notNullable().unique();
      tbl.string('password').notNullable();
      tbl.string('department').notNullable();
      tbl.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
