const httpStatus = require('http-status');
const { PublicWebhook } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a publicWebhook record
 * @param {Object} publicWebhookBody
 * @returns {Promise<PublicWebhook>}
 */
const registerTransaction = async (publicWebhookBody) => {
  try {
    return PublicWebhook.create(publicWebhookBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  registerTransaction,
};
