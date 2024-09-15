// GenericCategory.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const GenericCategory = sequelize.define(
  'GenericCategory',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    models: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    modelName: 'GenericCategory',
    tableName: 'GenericCategory',
  }
);

module.exports = GenericCategory;
