const httpStatus = require('http-status');
const { PublicWebhookPayments, PublicWebhookSubscriptions } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a publicWebhook record
 * @param {Object} publicWebhookBody
 * @returns {Promise<PublicWebhook>}
 */
const successfulSubscription = async (publicWebhookBody) => {
  try {
    const subscription = {
      ...publicWebhookBody,
      frequency: publicWebhookBody.frequency || null,
      coupon: publicWebhookBody.coupon || null,
    };

    return await PublicWebhookSubscriptions.create(subscription);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Create a publicWebhook record
 * @param {Object} publicWebhookBody
 * @returns {Promise<PublicWebhook>}
 */
const successfulPayment = async (publicWebhookBody) => {
  try {
    return await PublicWebhookPayments.create(publicWebhookBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  successfulSubscription,
  successfulPayment,
};
