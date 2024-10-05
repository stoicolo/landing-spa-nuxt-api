const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const LegalAgreementHistory = sequelize.define(
  'LegalAgreementHistory',
  {
    legalAgreementId: {
      type: DataTypes.STRING,
      required: true,
    },
    personalId: {
      type: DataTypes.STRING,
      required: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    agreed: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
    agreementDate: {
      type: DataTypes.DATE,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'LegalAgreementHistory',
    tableName: 'LegalAgreementHistory',
  }
);

module.exports = LegalAgreementHistory;
