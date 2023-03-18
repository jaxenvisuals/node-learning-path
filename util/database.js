const mySql = require("mysql2");

const config = require("../config");

const pool = mySql.createPool({
  host: config.DB_HOST,
  user: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

module.exports = pool.promise();
