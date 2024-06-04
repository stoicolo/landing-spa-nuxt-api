// Company.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Company = sequelize.define(
  'Company',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactLastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'Company',
    tableName: 'Company',
  }
);

// Add hooks
// Company.beforeCreate(async (company) => {
//   console.log('company beforeCreate', company);
// });

// Check if email is taken
Company.isEmailTaken = async (email) => {
  const company = await Company.findOne({
    where: {
      email,
    },
  });

  return !!company;
};

module.exports = Company;
