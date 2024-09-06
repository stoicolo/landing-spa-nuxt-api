const { Sequelize } = require('sequelize');
const config = require('./config');

const environment = config.node_env || 'development';

let sequelizeConfig;

if (environment === 'production') {
  sequelizeConfig = {
    dialect: config.database.dialect,
    host: config.database.host,
    database: config.database.name,
    username: config.database.username,
    password: config.database.password,
    port: config.database.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log,
  };
} else {
  sequelizeConfig = {
    dialect: config.database.dialect,
    host: config.database.host,
    database: config.database.name,
    adminDatabase: config.database.adminUser,
    username: config.database.username,
    password: config.database.password,
    port: config.database.port,
    ssl: config.database.ssl,
  };
}

const sequelize = new Sequelize(sequelizeConfig);

module.exports = { sequelize };
