const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
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
      defaultValue: () => uuidv4(),
    },
    agentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    externalCouponId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      references: {
        model: 'Coupon',
        key: 'externalCouponId',
      },
    },
    amountToPay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
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
