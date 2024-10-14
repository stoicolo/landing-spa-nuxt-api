const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { subscriptionHistoryService } = require('../services');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createSubscriptionHistory = catchAsync(async (req, res) => {
  try {
    const document = await subscriptionHistoryService.createSubscriptionHistory(req.body);

    res.status(httpStatus.CREATED).send(document);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
});

const getSubscriptionHistories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await subscriptionHistoryService.getSubscriptionHistories(filter, options);
  res.send(result);
});

const getSubscriptionHistoriesByUserId = catchAsync(async (req, res) => {
  const subscriptionHistory = await subscriptionHistoryService.getSubscriptionHistoriesByUserId(req.params.userId);

  if (!subscriptionHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Historial de Subscripcion no encontrado, verifica el id.');
  }
  res.send(subscriptionHistory);
});

const getSubscriptionHistoryBySubscriptionHistoryInternalId = catchAsync(async (req, res) => {
  const subscriptionHistory = await subscriptionHistoryService.getSubscriptionHistoryByInternalId(req.params.internalId);

  if (!subscriptionHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Historial de Subscripcion no encontrado, verifica el id.');
  }
  res.send(subscriptionHistory);
});

const updateSubscriptionHistory = catchAsync(async (req, res) => {
  const subscriptionHistory = await subscriptionHistoryService.updateSubscriptionHistory(req.body.internalId, req.body);

  res.send(subscriptionHistory);
});

const deleteSubscriptionHistory = catchAsync(async (req, res) => {
  await subscriptionHistoryService.deleteSubscriptionHistory(req.body.internalId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSubscriptionHistory,
  getSubscriptionHistories,
  getSubscriptionHistoriesByUserId,
  getSubscriptionHistoryBySubscriptionHistoryInternalId,
  updateSubscriptionHistory,
  deleteSubscriptionHistory,
};
