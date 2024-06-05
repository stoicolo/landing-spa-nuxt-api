// PageTemplate.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const PageTemplate = sequelize.define(
  'PageTemplate',
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
    modelName: 'PageTemplate',
    tableName: 'PageTemplate',
  }
);

module.exports = PageTemplate;
