const Joi = require('joi');

const registerTransaction = {
  body: Joi.object().keys({
    id_plan: Joi.number().required(),
    email: Joi.string().required(),
    modality: Joi.string().required(),
    amount: Joi.number().required(),
    coupon: Joi.string().required(),
    free_trial: Joi.number().required(),
    next_payment_date: Joi.string().required(),
    paymentId: Joi.number().required(),
    auth: Joi.number().required(),
  }),
};

module.exports = {
  registerTransaction,
};
