const Joi = require('joi');

const createPublishHistory = {
  body: Joi.object().keys({
    domain: Joi.string().required(),
    websiteId: Joi.string().required(),
    userId: Joi.string().required(),
    menuHeaderId: Joi.string().required(),
    isActive: Joi.boolean().required(),
    isPublic: Joi.boolean().required(),
  }),
};

const getPublishHistoriesById = {
  params: Joi.object().keys({
    publishHistoryId: Joi.number().required(),
  }),
};

const getPublishHistoriesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const updatePublishHistory = {
  params: Joi.object().keys({
    publishHistoryId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      domain: Joi.string(),
      isPublic: Joi.boolean(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deletePublishHistory = {
  params: Joi.object().keys({
    publishHistoryId: Joi.number().required(),
  }),
};

module.exports = {
  createPublishHistory,
  getPublishHistoriesById,
  getPublishHistoriesByUserId,
  updatePublishHistory,
  deletePublishHistory,
};
