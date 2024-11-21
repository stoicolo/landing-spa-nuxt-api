const Joi = require('joi');
const dayjs = require('dayjs');
const { articleTypes } = require('../config/articleLists');

const createArticle = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    userId: Joi.number().required(),
    version: Joi.string(),
    brandId: Joi.string(),
    categoryId: Joi.string(),
    yearOfManufacture: Joi.string()
      .custom((value, helpers) => {
        const date = dayjs(value, 'DD-MM-YYYY HH:mm', true);
        if (!date.isValid()) {
          return helpers.error('any.invalid');
        }
        if (date.isAfter(dayjs())) {
          return helpers.error('date.max');
        }
        return date.format('YYYY-MM-DD HH:mm'); // Convertimos al formato que Sequelize espera
      }, 'Date Validation')
      .messages({
        'any.invalid': 'La fecha debe estar en el formato DD-MM-YYYY HH:mm',
        'date.max': 'La fecha de fabricación debe ser en el pasado',
      }),
    price: Joi.number().precision(2).positive().default(0),
    sections: Joi.array().items(Joi.object()).required(),
    type: Joi.string()
      .required()
      .valid(...articleTypes),
  }),
};

const getArticle = {
  params: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const getArticleCategoriesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const updateArticle = {
  body: Joi.object()
    .keys({
      internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
      name: Joi.string().required(),
      version: Joi.string(),
      brandId: Joi.string(),
      categoryId: Joi.string(),
      yearOfManufacture: Joi.string()
        .custom((value, helpers) => {
          const date = dayjs(value, 'DD-MM-YYYY HH:mm', true);
          if (!date.isValid()) {
            return helpers.error('any.invalid');
          }
          if (date.isBefore(dayjs())) {
            return helpers.error('date.max');
          }
          return date.format('YYYY-MM-DD HH:mm'); // Convertimos al formato que Sequelize espera
        }, 'Date Validation')
        .messages({
          'any.invalid': 'La fecha debe estar en el formato DD-MM-YYYY HH:mm',
          'date.max': 'La fecha de fabricación debe ser en el pasado',
        }),
      price: Joi.number().precision(2).positive().default(0),
      sections: Joi.array().items(Joi.object()).required(),
    })
    .min(1),
};

const deleteArticle = {
  query: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

module.exports = {
  createArticle,
  getArticle,
  getArticleCategoriesByUserId,
  updateArticle,
  deleteArticle,
};
