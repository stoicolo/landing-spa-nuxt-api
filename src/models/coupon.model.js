const dayjs = require('dayjs');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');
const couponTypes = require('../config/couponTypes');
const { addPagination } = require('../utils/paginationUtil');

const Coupon = sequelize.define(
  'Coupon',
  {
    internalId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    externalCouponId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [couponTypes],
      },
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usage_by_user_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    renews_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'Coupon',
    tableName: 'Coupon',
  }
);

addPagination(Coupon);

module.exports = Coupon;
