const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const PublicWebhookPaymentFailed = sequelize.define(
  'PublicWebhookPaymentFailed',
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
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'PublicWebhookPaymentFailed',
    tableName: 'PublicWebhookPaymentFailed',
  }
);

module.exports = PublicWebhookPaymentFailed;
