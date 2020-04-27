 
exports.up = function(knex) { 
  return knex.schema.createTable("users", tbl => { 
      tbl.increments(); 
      tbl.string("username", 128).unique().notNullable(); 
      tbl.string("password", 128).notNullable(); 
      tbl.string("user_type", 128).notNullable(); 
      tbl.string("name", 128); 
      tbl.string("email", 128).notNullable().unique(); 
  }); 
}; 

exports.down = function(knex) { 
  return knex.schema.dropTableIfExists("users"); 
};
