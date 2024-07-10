const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const MenuDetail = sequelize.define(
  'MenuDetail',
  {
    menuHeaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuHeader',
        key: 'id',
      },
    },
    pageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Page',
        key: 'id',
      },
    },
    menuName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    href: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    iconName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'MenuDetail',
    tableName: 'MenuDetail',
  }
);

const associateMenuDetail = (models) => {
  MenuDetail.belongsTo(models.MenuHeader, {
    foreignKey: 'menuHeaderId',
  });
};

module.exports = { MenuDetail, associateMenuDetail };
