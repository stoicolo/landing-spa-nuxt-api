const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const { tokenTypeList } = require('../config/tokens');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(50).trim().messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder los 50 caracteres',
      'any.required': 'El nombre es requerido',
    }),
    email: Joi.string().required().email().lowercase().trim().messages({
      'string.email': 'Debe ser un email válido',
      'any.required': 'El email es requerido',
    }),
    password: Joi.string().required().custom(password).messages({
      'any.required': 'La contraseña es requerida',
    }),
    phoneNumber: Joi.string().required(),
    role: Joi.string().required().valid('user'),
    coupon: Joi.string().allow(null).allow(''),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer(),
  }),
};

const updateUser = {
  body: Joi.object()
    .keys({
      id: Joi.number().integer(),
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      phoneNumber: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const createToken = {
  body: Joi.object().keys({
    userId: Joi.number().integer(),
    tokenType: Joi.string()
      .required()
      .valid(...tokenTypeList),
    sendEmail: Joi.boolean().default(false),
  }),
};

module.exports = {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createToken,
};
