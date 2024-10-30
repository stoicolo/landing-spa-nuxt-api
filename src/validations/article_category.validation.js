const Joi = require('joi');

const createArticleCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().default(false),
    userId: Joi.number().required(),
  }),
};

const getArticleCategory = {
  params: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const getArticleCategoriesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const updateArticleCategory = {
  body: Joi.object()
    .keys({
      internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
      name: Joi.string(),
      active: Joi.boolean().default(false),
    })
    .min(1),
};

const deleteArticleCategory = {
  query: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

module.exports = {
  createArticleCategory,
  getArticleCategory,
  getArticleCategoriesByUserId,
  updateArticleCategory,
  deleteArticleCategory,
};
