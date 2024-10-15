const Joi = require('joi');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const createSubscriptionHistory = {
  body: Joi.object().keys({
    internalCouponId: Joi.string().guid({ version: 'uuidv4' }),
    newUserId: Joi.number().integer().positive().required(),
    amountPaid: Joi.number().precision(2).positive(),
    newUserEmail: Joi.string().email().required(),
    newSubscriptionNextPaymentDate: Joi.string()
      .custom((value, helpers) => {
        const date = dayjs(value, 'DD-MM-YYYY HH:mm', true);
        if (!date.isValid()) {
          return helpers.error('any.invalid');
        }
        if (date.isBefore(dayjs())) {
          return helpers.error('date.min');
        }
        return date.format('YYYY-MM-DD HH:mm'); // Convertimos al formato que Sequelize espera
      }, 'Date Validation')
      .messages({
        'any.invalid': 'La fecha debe estar en el formato DD-MM-YYYY HH:mm',
        'date.min': 'La fecha de vencimiento debe ser en el futuro',
      }),
    isNewUserSubscriptionActive: Joi.boolean().required().default(false),
  }),
};

const getSubscriptionHistories = {
  query: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const getSubscriptionHistoriesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().integer().positive().required(),
  }),
};

const getSubscriptionHistoryByInternalId = {
  params: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const updateSubscriptionHistory = {
  body: Joi.object()
    .keys({
      internalId: Joi.string().guid({ version: 'uuidv4' }),
      newSubscriptionNextPaymentDate: Joi.string()
        .custom((value, helpers) => {
          const date = dayjs(value, 'DD-MM-YYYY HH:mm', true);
          if (!date.isValid()) {
            return helpers.error('any.invalid');
          }
          if (date.isBefore(dayjs())) {
            return helpers.error('date.min');
          }
          return date.format('YYYY-MM-DD HH:mm'); // Convertimos al formato que Sequelize espera
        }, 'Date Validation')
        .messages({
          'any.invalid': 'La fecha debe estar en el formato DD-MM-YYYY HH:mm',
          'date.min': 'La fecha de vencimiento debe ser en el futuro',
        }),
      isNewUserSubscriptionActive: Joi.boolean().default(false),
    })
    .min(1),
};

const deleteSubscriptionHistory = {
  body: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
};

module.exports = {
  createSubscriptionHistory,
  getSubscriptionHistories,
  getSubscriptionHistoriesByUserId,
  getSubscriptionHistoryByInternalId,
  updateSubscriptionHistory,
  deleteSubscriptionHistory,
};
