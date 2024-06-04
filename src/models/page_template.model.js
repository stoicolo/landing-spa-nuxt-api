// PageTemplate.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const PageTemplate = sequelize.define('PageTemplate', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
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
});

module.exports = PageTemplate;
