const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { legalAgreementService, tokenService, emailService } = require('../services');
const { tokenTypes } = require('../config/tokens');
const logger = require('../config/logger');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createDocument = catchAsync(async (req, res) => {
  const user = await legalAgreementService.createUser(req.body);
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

const getDocuments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await legalAgreementService.queryUsers(filter, options);
  res.send(result);
});

const getDocumentsByUserId = catchAsync(async (req, res) => {
  const user = await legalAgreementService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Documento no encontrado, verifica el id.');
  }
  res.send(user);
});
const getDocumentByDocumentId = catchAsync(async (req, res) => {
  const user = await legalAgreementService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Documento no encontrado, verifica el id.');
  }
  res.send(user);
});

const updateDocument = catchAsync(async (req, res) => {
  const user = await legalAgreementService.updateUserById(req.body.id, req.body);
  res.send(user);
});

const deleteDocument = catchAsync(async (req, res) => {
  await legalAgreementService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getLegalAgreementByType = catchAsync(async (req, res) => {
  const { type } = req.params;
  const legalAgreement = await legalAgreementService.getLastLegalAgreementByType(type);

  if (!legalAgreement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Documento no encontrado, verifica el tipo.');
  }
  res.send(legalAgreement);
});

module.exports = {
  createDocument,
  getDocuments,
  getDocumentsByUserId,
  getDocumentByDocumentId,
  updateDocument,
  deleteDocument,
  getLegalAgreementByType,
};
