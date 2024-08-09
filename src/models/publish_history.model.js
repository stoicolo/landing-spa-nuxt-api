// PageTemplate.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const PublishHistory = sequelize.define(
  'PublishHistory',
  {
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    websiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Website',
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
    menuHeaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuHeader',
        key: 'id',
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'PublishHistory',
    tableName: 'PublishHistory',
  }
);

module.exports = PublishHistory;
