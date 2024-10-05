const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const MenuDetail = sequelize.define(
  'MenuDetail',
  {
    menuHeaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'MenuHeader',
        key: 'id',
      },
    },
    pageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Page',
        key: 'id',
      },
    },
    menuName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    href: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    iconName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      unique: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'MenuDetail',
    tableName: 'MenuDetail',
    // Definir la clave primaria compuesta
    primaryKey: ['menuHeaderId', 'pageId'],
  }
);

const associateMenuDetail = (models) => {
  MenuDetail.belongsTo(models.MenuHeader, {
    foreignKey: 'menuHeaderId',
  });
  MenuDetail.belongsTo(models.Page, {
    foreignKey: 'pageId',
  });
};

module.exports = { MenuDetail, associateMenuDetail };
