const Joi = require('joi');
const { password } = require('./custom.validation');

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase().trim().messages({
      'string.email': 'Debe ser un email válido',
      'any.required': 'El email es requerido',
    }),
    password: Joi.string().required().messages({
      'any.required': 'La contraseña es requerida',
    }),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required().messages({
      'any.required': 'El token de refresco es requerido',
    }),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    id: Joi.number().required().messages({
      'any.required': 'El User id es requerido',
    }),
    refreshToken: Joi.string().required().messages({
      'any.required': 'El token de refresco es requerido',
    }),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required().lowercase().trim().messages({
      'string.email': 'Debe ser un email válido',
      'any.required': 'El email es requerido',
    }),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    token: Joi.string().required().messages({
      'any.required': 'El token de restablecimiento de contraseña es requerido',
    }),
    password: Joi.string().required().custom(password).messages({
      'any.required': 'La nueva contraseña es requerida',
    }),
  }),
};

const verifyEmail = {
  body: Joi.object().keys({
    token: Joi.string().required().messages({
      'any.required': 'El token de verificación es requerido',
    }),
  }),
};

module.exports = {
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
