const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const logger = require('../config/logger');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    logger.warn(`Intento de inicio de sesión fallido para el email: ${email}`);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Correo electrónico o contraseña incorrectos');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  logger.info(`Intento de cierre de sesión con token: ${refreshToken}`);

  if (!refreshToken) {
    logger.error('Intento de cierre de sesión sin proporcionar refreshToken');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Se requiere refreshToken');
  }

  try {
    const refreshTokenDoc = await Token.findOne({
      where: {
        token: refreshToken,
        type: tokenTypes.REFRESH,
        blacklisted: false,
      },
      order: [['createdAt', 'DESC']],
    });

    if (!refreshTokenDoc) {
      logger.warn(`Token no encontrado o ya invalidado: ${refreshToken}`);
      return;
    }

    await refreshTokenDoc.destroy();
    logger.info(`Cierre de sesión exitoso. Token destruido: ${refreshToken}`);
  } catch (error) {
    logger.error(`Error durante el cierre de sesión: ${error.message}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error durante el cierre de sesión');
  }
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (body) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(body.refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(body.id);

    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.destroy();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    logger.error(`Error al refrescar el token de autenticación: ${error.message}`);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Por favor, inicie sesión nuevamente');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.userId);

    if (!user) {
      throw new Error();
    }

    await userService.updateUserById(user.id, { password: newPassword });
    await Token.destroy({ where: { userId: user.id, type: tokenTypes.RESET_PASSWORD } });
    logger.info(`Restablecimiento de contraseña exitoso para el usuario: ${user.email}`);
  } catch (error) {
    logger.error(`Fallo en el restablecimiento de contraseña: ${error.message}`);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'El restablecimiento de contraseña falló');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.destroy({ where: { userId: user.id, type: tokenTypes.VERIFY_EMAIL } });
    await userService.updateUserById(user.id, { isEmailVerified: true });
    logger.info(`Correo electrónico verificado exitosamente para el usuario: ${user.email}`);
  } catch (error) {
    logger.error(`Fallo en la verificación de correo electrónico: ${error.message}`);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'La verificación de correo electrónico falló');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
