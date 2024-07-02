const Joi = require('joi');

const createWebsite = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    templateId: Joi.number().required(),
    websiteName: Joi.string().required(),
  }),
};

const getWebsites = {
  params: Joi.object().keys({
    websiteId: Joi.number().required(),
  }),
};

const getWebsitesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
  query: Joi.object().keys({
    templateId: Joi.number(),
    userId: Joi.number(),
    websiteName: Joi.string(),
  }),
};

const getWebsiteByName = {
  params: Joi.object().keys({
    websiteName: Joi.string(),
  }),
  query: Joi.object().keys({
    templateId: Joi.number(),
    userId: Joi.number(),
    websiteName: Joi.string(),
  }),
};

const updateWebsite = {
  params: Joi.object().keys({
    websiteId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      websiteName: Joi.string(),
    })
    .min(1),
};

const deleteWebsite = {
  params: Joi.object().keys({
    websiteId: Joi.number().required(),
  }),
};

module.exports = {
  createWebsite,
  getWebsites,
  getWebsitesByUserId,
  getWebsiteByName,
  updateWebsite,
  deleteWebsite,
};
