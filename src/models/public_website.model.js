// PublicWebsite.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const PublicWebsite = sequelize.define(
  'PublicWebsite',
  {
    websiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Website',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'PublicWebsite',
    tableName: 'PublicWebsite',
  }
);

module.exports = PublicWebsite;
