const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const LegalAgreement = sequelize.define(
  'LegalAgreement',
  {
    registerUserId: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    lastModifierUserId: {
      type: DataTypes.INTEGER,
      required: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.STRING,
      required: true,
      defaultValue: 'terms',
    },
    description: {
      type: DataTypes.TEXT,
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
