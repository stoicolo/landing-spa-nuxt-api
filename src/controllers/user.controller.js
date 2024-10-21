const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService, emailService } = require('../services');
const { tokenTypes } = require('../config/tokens');
const logger = require('../config/logger');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user, tokenTypes.VERIFY_EMAIL);
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

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
  }
  res.send(user);
});

const checkUserActivationStatusbyUserId = catchAsync(async (req, res) => {
  const user = await userService.getUserByPk(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
  }
  res.send({ isUserVerified: user.isEmailVerified });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.body.id, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendContactFormResponseEmail = catchAsync(async (req, res) => {
  await emailService.sendContactFormResponseEmail(req.body);
  logger.info('Email for "sendContactFormResponseEmail" has been sent successfully');
  res.status(httpStatus.NO_CONTENT).send();
});

const sendSubdomainEmail = catchAsync(async (req, res) => {
  const tokenBody = {
    id: req.body.userId,
    name: req.body.clientName,
    email: req.body.clientEmail,
  };
  const response = await tokenService.generateAuthTokens(tokenBody, tokenTypes.TRIAL_DAYS);

  await emailService.sendSubdomainEmail(req.body, response.trial_days);
  logger.info('Email for "sendSubdomainEmail" has been sent successfully');
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Create Token for user by userId and tokenType
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createToken = catchAsync(async (req, res) => {
  try {
    const user = await userService.getUserById(req.body.userId);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
    }

    const tokens = await tokenService.generateAuthTokens(user, req.body.tokenType);

    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      tokens,
    };

    if (req.body.sendEmail) {
      // await emailService.sendEmailActivation(response.user, response.tokens);
    }

    logger.info(`Token created for user: ${user.email}`);
    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    logger.error(`Error in createToken: ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error when createToken');
  }
});

module.exports = {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  sendContactFormResponseEmail,
  sendSubdomainEmail,
  checkUserActivationStatusbyUserId,
  createToken,
};
