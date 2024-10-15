const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../config/sequelize');
const agentTypes = require('../config/agentTypes');
const { addPagination } = require('../utils/paginationUtil');

const Agent = sequelize.define(
  'Agent',
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
    internalCouponId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
      unique: true,
      references: {
        model: 'Coupon',
        key: 'internalId',
      },
    },
    agentType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [agentTypes],
      },
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'Agent',
    tableName: 'Agent',
  }
);

addPagination(Agent);

module.exports = Agent;
