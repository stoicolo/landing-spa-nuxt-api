const Joi = require('joi');

const successfulSubscription = {
  body: Joi.object().keys({
    id_plan: Joi.number().required(),
    email: Joi.string().required(),
    modality: Joi.string().required(),
    amount: Joi.number().required(),
    coupon: Joi.any(),
    free_trial: Joi.number().required(),
    next_payment_date: Joi.string().required(),
    paymentId: Joi.number().required(),
    auth: Joi.number().required(),
    frequency: Joi.any(),
  }),
};

const successfulPayment = {
  body: Joi.object().keys({
    id_plan: Joi.number().required(),
    email: Joi.string().required(),
    amount: Joi.number().required(),
    orderNumber: Joi.string().required(),
    paymentId: Joi.number().required(),
    auth: Joi.number().required(),
  }),
};

const failedPayment = {
  body: Joi.object().keys({
    id_plan: Joi.number().required(),
    email: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

module.exports = {
  successfulSubscription,
  successfulPayment,
  failedPayment,
};
