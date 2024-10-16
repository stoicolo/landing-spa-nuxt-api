const httpStatus = require('http-status');
const { PublicWebhookPayments, PublicWebhookSubscriptions, PublicWebhookPaymentFailed } = require('../models');
const subscriptionHistoryService = require('./subscription_history.service');
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
      coupon: publicWebhookBody.coupon ?? null,
      frequency: publicWebhookBody.frequency ?? null,
    };

    const postResponse = await PublicWebhookSubscriptions.create(subscription);

    if (subscription.email) {
      const subscriptionToUpdate = await subscriptionHistoryService.getSubscriptionHistoryByNewUserEmail(subscription.email);

      if (!subscriptionToUpdate) {
        // TODO: Enviar EMAIL a soporte porque el usuario está usando un Email que no existe en la base de datos
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Email NO registrado al buscar Historial de Subscripción, verifica el email en base de datos.'
        );
      }

      const payload = {
        amountPaid: subscription.amount,
        newSubscriptionNextPaymentDate: subscription.next_payment_date,
        isNewUserSubscriptionActive: true,
      };

      await subscriptionHistoryService.updateSubscriptionHistoryByEmail(subscription.email, payload);
    } else {
      // TODO: Enviar EMAIL a soporte porque el usuario está usando un Email que no existe en la base de datos
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Email NO registrado al buscar Historial de Subscripción, verifica el email en base de datos.'
      );
    }

    return postResponse;
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

/**
 * Create a publicWebhook record
 * @param {Object} publicWebhookBody
 * @returns {Promise<PublicWebhook>}
 */
const failedPayment = async (publicWebhookBody) => {
  try {
    return await PublicWebhookPaymentFailed.create(publicWebhookBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  successfulSubscription,
  successfulPayment,
  failedPayment,
};
