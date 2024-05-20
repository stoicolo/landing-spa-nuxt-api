// Quiz.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Quiz = sequelize.define(
  'Quiz',
  {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'id',
      },
    },
    preg1: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    preg2: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: true,
      defaultValue: [false, false, false, false, false, false, false, false, false],
    },
    preg3: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    preg4: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    preg5_type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    preg5: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    preg6: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    preg7: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    preg8: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    preg9: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    preg9_content: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    preg10: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    preg10_content: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    preg11: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    inputResult: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    outputResult: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'Quiz',
    tableName: 'Quiz',
  }
);

// Add hooks
Quiz.beforeCreate(async (quiz) => {
  console.log('quiz beforeCreate', quiz);
});

// Check if company has taken a Quiz
Quiz.isCompanyQuizTaken = async (id) => {
  const quiz = await Quiz.findOne({
    where: {
      companyId: id,
    },
  });

  return !!quiz;
};

module.exports = Quiz;
