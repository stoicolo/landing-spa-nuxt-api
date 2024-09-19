// PublicWebhook.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const PublicWebhook = sequelize.define(
  'PublicWebhook',
  {
    id_plan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coupon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    free_trial: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    next_payment_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    auth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'PublicWebhook',
    tableName: 'PublicWebhook',
  }
);

module.exports = PublicWebhook;
