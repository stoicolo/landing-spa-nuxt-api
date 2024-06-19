// PageTemplate.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const PageTemplateBackup = sequelize.define(
  'PageTemplateBackup',
  {
    backupName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pageName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Page',
        key: 'pageName',
      },
    },
    pageTemplateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PageTemplate',
        key: 'id',
      },
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
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'PageTemplateBackup',
    tableName: 'PageTemplateBackup',
  }
);

module.exports = PageTemplateBackup;
