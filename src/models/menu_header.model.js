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
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'MenuHeader',
    tableName: 'MenuHeader',
  }
);

const associateMenuHeader = (models) => {
  MenuHeader.hasMany(models.MenuDetail, {
    foreignKey: 'menuHeaderId',
    as: 'menuDetails',
  });
};

module.exports = { MenuHeader, associateMenuHeader };
