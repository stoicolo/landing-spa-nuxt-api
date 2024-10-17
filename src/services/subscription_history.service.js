const httpStatus = require('http-status');
const { SubscriptionHistory } = require('../models');
const payrollService = require('./payroll.service');
const agentService = require('./agent.service');
const couponService = require('./coupon.service');
const ApiError = require('../utils/ApiError');

/**
 * Create a subscriptionHistory
 * @param {Object} subscriptionHistoryBody
 * @returns {Promise<SubscriptionHistory>}
 */
const createSubscriptionHistory = async (subscriptionHistoryBody) => {
  try {
    const subscriptionHistory = await SubscriptionHistory.create(subscriptionHistoryBody);

    // If the subscriptionHistory has an internalCouponId, its because an agent is involved
    if (subscriptionHistory.externalCouponId) {
      const agent = await agentService.getAgentIdByCouponExternalId(subscriptionHistory.externalCouponId);

      if (!agent) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Agente no encontrado, verifica el id.');
      }

      const coupon = await couponService.getCouponByExternalId(subscriptionHistory.externalCouponId);

      if (!coupon) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Cupón no encontrado, verifica el id.');
      }

      let percentageToPay = 0;
      if (agent.agentType === 'standard') {
        percentageToPay = 15;
      }
      if (agent.agentType === 'premium') {
        percentageToPay = 30;
      }

      const newPayrollRecord = {
        agentId: agent.agentId,
        agentType: agent.agentType,
        percentageToPay,
        clientId: subscriptionHistoryBody.newUserId,
        externalCouponId: subscriptionHistoryBody.externalCouponId,
        amountToPay: null, // tilopay will calculate this via webhook successful
        isNewUserSubscriptionActive: false, // tilopay will calculate this via webhook successful
      };

      await payrollService.createPayroll(newPayrollRecord);
    }

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
 * Get SubscriptionHistory by subscriptionHistoryInternalId
 * @param {ObjectId} subscriptionHistoryNewUserEmail
 * @returns {Promise<SubscriptionHistory>}
 */
const getSubscriptionHistoryByNewUserEmail = async (subscriptionHistoryNewUserEmail) => {
  return SubscriptionHistory.findOne({
    where: {
      newUserEmail: subscriptionHistoryNewUserEmail,
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

  const { internalId, newUserId, internalCouponId, newUserEmail, ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(subscriptionHistory, updateBodyWithoutColumnsNotEditable);

  await subscriptionHistory.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return subscriptionHistory;
};

/**
 * Update subscriptionHistory by new user email
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<SubscriptionHistory>}
 */
const updateSubscriptionHistoryByEmail = async (newUserEmail, updateBody) => {
  const subscriptionHistory = await getSubscriptionHistoryByNewUserEmail(newUserEmail);

  if (!subscriptionHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Historial de Subscripción no encontrado, verifica el id.');
  }

  const { internalId, newUserId, internalCouponId, ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(subscriptionHistory, updateBodyWithoutColumnsNotEditable);

  const responseSubscriptionHistory = await subscriptionHistory.save({
    fields: Object.keys(updateBodyWithoutColumnsNotEditable),
  });

  const agent = await agentService.getAgentIdByCouponExternalId(subscriptionHistory.externalCouponId);

  if (!agent) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Agente no encontrado, verifica el id.');
  }

  let numberToPay = 0;

  if (agent) {
    if (agent.agentType === 'standard') {
      numberToPay = 15 / 100; // %
    }
    if (agent.agentType === 'premium') {
      numberToPay = 30 / 100; // %
    }
  }

  try {
    const amountToPay = updateBody.amountPaid * numberToPay;
    const payrollToUpdate = {
      amountToPay,
      isNewUserSubscriptionActive: updateBody.isNewUserSubscriptionActive,
    };

    const postResponse = await payrollService.updatePayrollByPublicWebhooks(
      subscriptionHistory.newUserId,
      agent.agentId,
      payrollToUpdate
    );

    return postResponse;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }

  return responseSubscriptionHistory;

  try {
    const subscription = {
      ...publicWebhookBody,
      coupon: publicWebhookBody.coupon ?? null,
      frequency: publicWebhookBody.frequency ?? null,
    };

    let postResponse = await PublicWebhookSubscriptions.create(subscription);

    if (subscription.email) {
      const subscriptionToUpdate = await subscriptionHistoryService.getSubscriptionHistoryByNewUserEmail(subscription.email);

      if (!subscriptionToUpdate) {
        // TODO: Enviar EMAIL a soporte porque el usuario está usando un Email que no existe en la base de datos
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Email NO registrado al buscar Historial de Subscripción, verifica el email en base de datos.'
        );
      }

      const coupon = await couponService.getCouponByExternalId(subscription.coupon);

      let numberToDiscount = 0;

      if (coupon) {
        if (coupon.type === 'percentage') {
          numberToDiscount = +coupon.discount / 100; // %
        }
        if (coupon.type === 'amount') {
          numberToDiscount = +coupon.discount; // USD
        }
      }

      const amountToPay = subscription.amount - subscription.amount * numberToDiscount;
      const payload = {
        amountPaid: amountToPay,
        newSubscriptionNextPaymentDate: subscription.next_payment_date,
        isNewUserSubscriptionActive: true,
      };

      postResponse = await subscriptionHistoryService.updateSubscriptionHistoryByEmail(subscription.email, payload);
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
  getSubscriptionHistoryByNewUserEmail,
  updateSubscriptionHistoryByEmail,
};
