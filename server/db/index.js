const connection = 'localhost';

const db = require('knex')({
  client: 'pg',
  connection: {
    host: connection,
    user: 'postgres',
    password: 'password',
    database: 'atelier',
  },
});

module.exports = db;
