
exports.up = function(knex) {
  return knex.schema.createTable("predictions", tbl => {
      tbl.increments('id'); 
      tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');  
      tbl.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onUpdate('CASCADE').
      onDelete('CASCADE');  
      tbl.json("prediction"); 
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("predictions"); 
};
