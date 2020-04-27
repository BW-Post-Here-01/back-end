
exports.up = function(knex) {
  return knex.schema.createTable("posts", tbl => {
    tbl.increments("id"); 
    tbl.integer("user_id").unsigned().notNullable().references("id").inTable("users").onUpdate('CASCADE').onDelete('CASCADE'); 
    tbl.string("post_title", 128).notNullable()
    tbl.text("post_text").notNullable(); 
  }); 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("posts"); 
};
