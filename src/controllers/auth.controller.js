const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const logger = require('../config/logger');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  const response = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    tokens,
  };
  await emailService.sendEmailActivation(response.user, response.tokens);
  logger.info(`User registered: ${user.email}`);
  res.status(httpStatus.CREATED).send(response);
});

/**
 * User login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const localUser = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(localUser);
  const response = {
    user: {
      id: localUser.id,
      name: localUser.name,
      email: localUser.email,
      role: localUser.role,
    },
    tokens,
  };

  logger.info(`User logged in: ${localUser.email}`);
  res.send(response);
});

/**
 * User logout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  logger.info(`User logged out`);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Refresh authentication tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body);

  res.send({ ...tokens });
});

/**
 * Send password reset email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  logger.info(`Password reset request for: ${req.body.email}`);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Reset password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  logger.info('Password reset successfully');
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Send verification email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateAuthTokens(req.body.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  logger.info(`Verification email sent to: ${req.user.email}`);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Send activation email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendActivationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateAuthTokens(req.body.user);
  await emailService.sendEmailActivation(req.body.user, verifyEmailToken);
  logger.info(`Activation email sent to: ${req.user.email}`);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Verify email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.body.token);
  logger.info('Email verified successfully');
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  sendActivationEmail,
  verifyEmail,
};
