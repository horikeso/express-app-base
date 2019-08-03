require('dotenv').config();
exports = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    charset: 'UTF8MB4_GENERAL_CI'
  },
  pool: { min: 0, max: 7 }
});
