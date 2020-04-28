
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'username', password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoidXNlcm5hbWUzMyIsImlhdCI6MTU4ODA5OTk5NiwiZXhwIjoxNTg4MTg2Mzk2fQ.GjncYIwmfQgwAwLnOYs_4ouptn6UBRRHyumyWU4pFE8', email: 'email@email.com'},
        {username: 'jack', password: 'jack', email: 'jack@jack.com'},
        {username: 'test', password: 'test', email: 'test@test.com'}
      ]);
    // });
};
