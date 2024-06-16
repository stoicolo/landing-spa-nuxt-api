// PageTemplate.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Page = sequelize.define(
  'Page',
  {
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PageTemplate',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    pageName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'Page',
    tableName: 'Page',
  }
);

module.exports = Page;
