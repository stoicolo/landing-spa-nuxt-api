const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const PublicWebhookPayments = sequelize.define(
  'PublicWebhookPayments',
  {
    id_plan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'PublicWebhookPayments',
    tableName: 'PublicWebhookPayments',
  }
);

module.exports = PublicWebhookPayments;
