const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');
const { toJSON, paginate } = require('./plugins');
const { sequelize } = require('../config/sequelize');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: {
          args: [8],
          msg: 'Password must be at least 8 characters in length',
        },
        isValidPassword(value) {
          if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) {
            throw new Error('Password must contain at least one letter, one number, and one special character');
          }
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [roles], // checks that value is inside 'roles'
      },
    },

    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the `sequelize` instance
    modelName: 'User',
    tableName: 'User',
  }
);

// Add hooks
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

// Check if email is taken
User.isEmailTaken = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return !!user;
};

// Check if password matches the user's password
User.prototype.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Add plugins
toJSON(User);
paginate(User);

module.exports = User;
