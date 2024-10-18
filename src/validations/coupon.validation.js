const Joi = require('joi');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const couponTypes = require('../config/couponTypes');

dayjs.extend(customParseFormat);

const createCoupon = {
  body: Joi.object().keys({
    externalCouponId: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string()
      .required()
      .valid(...couponTypes),
    discount: Joi.number().precision(2).positive().allow(0).required(),
    currency: Joi.string().default('USD'),
    due_date: Joi.date().required(),
    usage_limit: Joi.number().integer().positive().required(),
    usage_by_user_limit: Joi.number().integer().positive().required(),
    renews_limit: Joi.number().integer().min(0).required(),
    allow_any_user: Joi.boolean().default(false),
    active: Joi.boolean().default(true),
  }),
};

const getCoupons = {
  query: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const getLastCouponByType = {
  query: Joi.object().keys({
    type: Joi.string().valid(...couponTypes),
  }),
};

const getCouponsByUserId = {
  query: Joi.object().keys({
    userId: Joi.number().integer().positive().required(),
  }),
};

const getCouponByInternalId = {
  query: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const updateCoupon = {
  body: Joi.object()
    .keys({
      internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
      externalCouponId: Joi.string(),
      description: Joi.string(),
      type: Joi.string().valid(...couponTypes),
      discount: Joi.number().precision(2).positive(),
      currency: Joi.string(),
      due_date: Joi.string()
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
      usage_limit: Joi.number().integer().positive(),
      usage_by_user_limit: Joi.number().integer().positive(),
      renews_limit: Joi.number().integer().min(0),
      allow_any_user: Joi.boolean().default(false),
      active: Joi.boolean(),
    })
    .min(1),
};

const deleteCoupon = {
  body: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponsByUserId,
  getCouponByInternalId,
  updateCoupon,
  deleteCoupon,
  getLastCouponByType,
};
