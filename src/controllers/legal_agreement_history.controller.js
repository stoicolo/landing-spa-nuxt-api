const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { legalAgreementHistoryService } = require('../services');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createDocument = catchAsync(async (req, res) => {
  try {
    const document = await legalAgreementHistoryService.createDocument(req.body);

    res.status(httpStatus.CREATED).send(document);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
});

const getDocuments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await legalAgreementHistoryService.queryUsers(filter, options);
  res.send(result);
});

const getDocumentsByUserId = catchAsync(async (req, res) => {
  const user = await legalAgreementHistoryService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
  }
  res.send(user);
});
const getDocumentByDocumentId = catchAsync(async (req, res) => {
  const user = await legalAgreementHistoryService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
  }
  res.send(user);
});

const updateDocument = catchAsync(async (req, res) => {
  const user = await legalAgreementHistoryService.updateUserById(req.body.id, req.body);
  res.send(user);
});

const deleteDocument = catchAsync(async (req, res) => {
  await legalAgreementHistoryService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDocument,
  getDocuments,
  getDocumentsByUserId,
  getDocumentByDocumentId,
  updateDocument,
  deleteDocument,
};
