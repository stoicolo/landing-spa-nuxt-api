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
    },
    imageExternalId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      defaultValue: [],
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
