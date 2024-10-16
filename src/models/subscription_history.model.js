const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../config/sequelize');
const { addPagination } = require('../utils/paginationUtil');

const SubscriptionHistory = sequelize.define(
  'SubscriptionHistory',
  {
    internalId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv4(),
    },
    newUserId: {
      type: DataTypes.INTEGER,
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
    amountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    newUserEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        isEmail: true,
      },
    },
    newSubscriptionNextPaymentDate: {
      type: DataTypes.DATEONLY,
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
    modelName: 'SubscriptionHistory',
    tableName: 'SubscriptionHistory',
  }
);

addPagination(SubscriptionHistory);

module.exports = SubscriptionHistory;
