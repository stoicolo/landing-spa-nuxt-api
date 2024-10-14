const Joi = require('joi');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const createPayroll = {
  body: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
    agentId: Joi.number().integer().positive().required(),
    agentType: Joi.string().required(),
    percentageToPay: Joi.number().precision(2).positive(),
    clientId: Joi.number().integer().positive().required(),
    internalCouponId: Joi.string().guid({ version: 'uuidv4' }),
    amountToPay: Joi.number().precision(2).positive(),
    isNewUserSubscriptionActive: Joi.boolean().required().default(false),
  }),
};

const getPayrolls = {
  query: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const getPayrollsByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().integer().positive().required(),
  }),
};

const getPayrollByInternalId = {
  params: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const updatePayroll = {
  body: Joi.object()
    .keys({
      internalId: Joi.string().guid({ version: 'uuidv4' }),
      isNewUserSubscriptionActive: Joi.boolean().default(false),
    })
    .min(1),
};

const deletePayroll = {
  body: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
};

module.exports = {
  createPayroll,
  getPayrolls,
  getPayrollsByUserId,
  getPayrollByInternalId,
  updatePayroll,
  deletePayroll,
};
