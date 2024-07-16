const Joi = require('joi');

const createPublishHistory = {
  body: Joi.object().keys({
    domain: Joi.string().required(),
    websiteId: Joi.number().required(),
    userId: Joi.number().required(),
    menuHeaderId: Joi.number().required(),
    isActive: Joi.boolean().required(),
    isPublic: Joi.boolean().required(),
  }),
};

const getPublishHistoriesById = {
  params: Joi.object().keys({
    publishHistoryId: Joi.number().required(),
  }),
};

const getPublishHistoriesByWebsiteId = {
  params: Joi.object().keys({
    websiteId: Joi.number(),
  }),
};

const getPublishHistoriesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const updatePublishHistory = {
  body: Joi.object()
    .keys({
      publishHistoryId: Joi.number().required(),
      domain: Joi.string(),
      isPublic: Joi.boolean(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deletePublishHistory = {
  body: Joi.object().keys({
    publishHistoryId: Joi.number().required(),
  }),
};

module.exports = {
  createPublishHistory,
  getPublishHistoriesById,
  getPublishHistoriesByUserId,
  getPublishHistoriesByWebsiteId,
  updatePublishHistory,
  deletePublishHistory,
};
