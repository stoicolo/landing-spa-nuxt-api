const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Website = sequelize.define(
  'Website',
  {
    pageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Page',
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
    websiteName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'Website',
    tableName: 'Website',
  }
);

module.exports = Website;
