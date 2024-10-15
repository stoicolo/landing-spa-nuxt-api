const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');
const agentTypes = require('../config/agentTypes');
const discountAmounts = require('../config/discountAmounts');
const { addPagination } = require('../utils/paginationUtil');

const Payroll = sequelize.define(
  'Payroll',
  {
    internalId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    agentType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [agentTypes],
      },
    },
    percentageToPay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isIn: [discountAmounts],
      },
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    internalCouponId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      references: {
        model: 'Coupon',
        key: 'internalId',
      },
    },
    amountToPay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    isNewUserSubscriptionActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'Payroll',
    tableName: 'Payroll',
  }
);

addPagination(Payroll);

module.exports = Payroll;