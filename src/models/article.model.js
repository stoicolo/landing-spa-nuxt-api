// GenericCategory.js

const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');
const { articleTypes } = require('../config/articleLists');

const Article = sequelize.define(
  'Article',
  {
    internalId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    version: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    brandId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'ArticleBrand',
        key: 'internalId',
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [articleTypes],
      },
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'ArticleCategory',
        key: 'internalId',
      },
    },
    yearOfManufacture: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    sections: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'Article',
    tableName: 'Article',
  }
);

module.exports = Article;
