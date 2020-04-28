
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'username', password: '$2a$15$M69Xq3bGP6g8F4HT9Hh7fekn92z26AdHjoMaoOVTS79TVUoDNJmhG', email: 'email@email.com'},
        {username: 'jack', password: 'jack', email: 'jack@jack.com'},
        {username: 'test', password: 'test', email: 'test@test.com'}
      ]);
    // });
};
