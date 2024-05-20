const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

// Authentication verification
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  // Check for error, info, or unauthenticated user
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Por favor autenticarse, para continuar.'));
  }

  req.user = user;

  // Check if rights are required and if the user has them
  if (requiredRights && requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Acceso denegado, no tienes los permisos necesarios.'));
    }
  }

  resolve();
};

// Authentication middleware
const authConfig =
  (...requiredRights) =>
  async (req, res, next) => {
    try {
      // Authenticate the request using Passport
      await new Promise((resolve, reject) => {
        passport.authenticate('CC_Strategy_jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
          req,
          res,
          next
        );
      });

      // If authenticated successfully, move to the next middleware
      next();
    } catch (err) {
      // Capture any error and pass it to the next error handling middleware
      next(err);
    }
  };

module.exports = authConfig;
