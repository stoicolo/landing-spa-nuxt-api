// GenericTemplate.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const GenericTemplate = sequelize.define(
  'GenericTemplate',
  {
    sections: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
      defaultValue: [],
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'GenericTemplate',
    tableName: 'GenericTemplate',
  }
);

module.exports = GenericTemplate;
