const httpStatus = require('http-status');
const { SubscriptionHistory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a subscriptionHistory
 * @param {Object} subscriptionHistoryBody
 * @returns {Promise<SubscriptionHistory>}
 */
const createSubscriptionHistory = async (subscriptionHistoryBody) => {
  try {
    const subscriptionHistory = await SubscriptionHistory.create(subscriptionHistoryBody);
    return subscriptionHistory;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get SubscriptionHistory by subscriptionHistoryInternalId
 * @param {ObjectId} subscriptionHistoryInternalId
 * @returns {Promise<SubscriptionHistory>}
 */
const getSubscriptionHistoryByInternalId = async (subscriptionHistoryInternalId) => {
  return SubscriptionHistory.findOne({
    where: {
      internalId: subscriptionHistoryInternalId,
    },
  });
};

/**
 * Query for SubscriptionHistories
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getSubscriptionHistories = async (filter, options) => {
  const subscriptionHistorys = await SubscriptionHistory.paginate(filter, options);
  return subscriptionHistorys;
};

/**
 * Get SubscriptionHistory by User id
 * @param {ObjectId} userId
 * @returns {Promise<SubscriptionHistory>}
 */
const getSubscriptionHistoriesByUserId = async (userId) => {
  return SubscriptionHistory.findAll({
    where: {
      newUserId: userId,
    },
  });
};

/**
 * Update subscriptionHistory by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<SubscriptionHistory>}
 */
const updateSubscriptionHistory = async (id, updateBody) => {
  const subscriptionHistory = await getSubscriptionHistoryByInternalId(id);

  if (!subscriptionHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el id.');
  }

  const { internalId, newUserId, internalCouponId, amountPaid, newUserEmail, ...updateBodyWithoutColumnsNotEditable } =
    updateBody;

  Object.assign(subscriptionHistory, updateBodyWithoutColumnsNotEditable);

  await subscriptionHistory.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return subscriptionHistory;
};

/**
 * Delete subscriptionHistory by id
 * @param {ObjectId} subscriptionHistoryInternalId
 * @returns {Promise<SubscriptionHistory>}
 */
const deleteSubscriptionHistory = async (subscriptionHistoryInternalId) => {
  const subscriptionHistory = await getSubscriptionHistoryByInternalId(subscriptionHistoryInternalId);

  if (!subscriptionHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el id.');
  }
  await subscriptionHistory.destroy();
  return subscriptionHistory;
};

module.exports = {
  createSubscriptionHistory,
  getSubscriptionHistories,
  getSubscriptionHistoriesByUserId,
  getSubscriptionHistoryByInternalId,
  updateSubscriptionHistory,
  deleteSubscriptionHistory,
};
