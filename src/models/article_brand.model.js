// GenericCategory.js

const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const ArticleBrand = sequelize.define(
  'ArticleBrand',
  {
    internalId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
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
    modelName: 'ArticleBrand',
    tableName: 'ArticleBrand',
  }
);

module.exports = ArticleBrand;