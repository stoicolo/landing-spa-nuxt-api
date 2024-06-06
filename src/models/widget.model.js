// Widget.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Widget = sequelize.define(
  'Widget',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      trim: true,
    },
    element: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'Widget',
    tableName: 'Widget',
  }
);

module.exports = Widget;
