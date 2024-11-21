const Joi = require('joi');

const createArticleBrand = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().default(false),
    userId: Joi.number().required(),
  }),
};

const getArticleBrand = {
  params: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const getArticleCategoriesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const updateArticleBrand = {
  body: Joi.object()
    .keys({
      internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
      name: Joi.string(),
      active: Joi.boolean().default(false),
    })
    .min(1),
};

const deleteArticleBrand = {
  query: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

module.exports = {
  createArticleBrand,
  getArticleBrand,
  getArticleCategoriesByUserId,
  updateArticleBrand,
  deleteArticleBrand,
};
