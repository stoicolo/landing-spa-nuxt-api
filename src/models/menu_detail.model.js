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
