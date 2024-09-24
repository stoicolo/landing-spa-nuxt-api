const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const logger = require('../config/logger');

// Authentication verification callback
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    logger.warn(`Fallo de autenticación: ${err?.message || info?.message || 'Usuario no encontrado'}`);
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Por favor, autentíquese para continuar.'));
  }

  req.user = user;

  // Check if rights are required and if the user has them
  if (requiredRights && requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      logger.warn(`Intento de acceso no autorizado por el usuario ${user.id} a la ruta ${req.originalUrl}`);
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Acceso denegado. No tiene los permisos necesarios.'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('CC_Strategy_jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
