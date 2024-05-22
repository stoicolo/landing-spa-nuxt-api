// Widget.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Widget = sequelize.define('Widget', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  element: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },
});

module.exports = Widget;
