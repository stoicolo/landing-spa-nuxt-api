const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');
const { tokenTypes } = require('../config/tokens');

const Token = sequelize.define(
  'Token',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL, tokenTypes.ACCESS]],
      },
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'Token',
    tableName: 'Token',
  }
);

module.exports = Token;
