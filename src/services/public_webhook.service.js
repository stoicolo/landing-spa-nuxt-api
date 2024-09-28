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

    console.log('%csrc/services/public_webhook.service.js:18 subscription', 'color: #007acc;', subscription);
    return PublicWebhookSubscriptions.create(subscription);
  } catch (error) {
    console.log('%csrc/services/public_webhook.service.js:21 error', 'color: #007acc;', error);
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
