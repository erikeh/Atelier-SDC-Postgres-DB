import { Knex } from 'knex';

const connection = '0.0.0.0';

const db: Knex = require('knex')({
  client: 'pg',
  connection: {
    host: connection,
    user: 'postgres',
    password: 'password',
    database: 'atelier',
  },
});

module.exports = db;
