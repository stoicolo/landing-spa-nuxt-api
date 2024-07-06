const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const MenuHeader = sequelize.define(
  'MenuHeader',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    websiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Website',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'MenuHeader',
    tableName: 'MenuHeader',
  }
);

module.exports = MenuHeader;
