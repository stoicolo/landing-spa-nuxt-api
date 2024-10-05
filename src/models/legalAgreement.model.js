const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const LegalAgreement = sequelize.define(
  'LegalAgreement',
  {
    registerPersonalId: {
      type: DataTypes.STRING,
      required: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    lastModifierPersonalId: {
      type: DataTypes.STRING,
      required: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    legalAgreementId: {
      type: DataTypes.STRING,
      required: true,
    },
    type: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
    releaseDate: {
      type: DataTypes.STRING,
      required: false,
    },
    registrationDate: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'LegalAgreement',
    tableName: 'LegalAgreement',
  }
);

module.exports = LegalAgreement;
