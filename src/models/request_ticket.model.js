const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const RequestTicket = sequelize.define(
  'RequestTicket',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    websiteName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    websiteGlobalConfig: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'RequestTicket',
    tableName: 'RequestTicket',
  }
);

module.exports = RequestTicket;
