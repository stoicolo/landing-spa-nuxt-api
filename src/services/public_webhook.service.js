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
      coupon: publicWebhookBody.coupon || '',
      frequency: publicWebhookBody.frequency || '',
    };

    return PublicWebhookSubscriptions.create(subscription);
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
    return PublicWebhookPayments.create(publicWebhookBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  successfulSubscription,
  successfulPayment,
};
