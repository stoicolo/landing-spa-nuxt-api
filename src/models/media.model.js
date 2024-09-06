const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Media = sequelize.define(
  'Media',
  {
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
    imageExternalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageExternalId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'Media',
    tableName: 'Media',
  }
);

module.exports = Media;