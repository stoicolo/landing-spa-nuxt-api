// sequelize config and Postgres database connection

const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize({
  dialect: config.database.dialect,
  host: config.database.host,
  database: config.database.name,
  adminDatabase: config.database.adminUser,
  username: config.database.username,
  password: config.database.password,
  port: config.database.port,
  ssl: config.database.ssl,
});

module.exports = { sequelize };
