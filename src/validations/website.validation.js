const Joi = require('joi');

const createWebsite = {
  body: Joi.object().keys({
    userId: Joi.number().integer().positive().required(),
    websiteName: Joi.string().min(3).max(100).required(),
    domain: Joi.string().domain().required(),
    slug: Joi.string()
      .lowercase()
      .pattern(/^[a-z0-9-]+$/)
      .min(3)
      .max(50)
      .required(),
    websiteGlobalConfig: Joi.alternatives().try(Joi.object()).required(),
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
};

const getWebsiteByName = {
  params: Joi.object().keys({
    websiteName: Joi.string(),
  }),
};

const updateWebsite = {
  params: Joi.object().keys({
    websiteId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.number().integer().positive(),
      websiteName: Joi.string().min(3).max(100),
      domain: Joi.string().domain(),
      slug: Joi.string()
        .lowercase()
        .pattern(/^[a-z0-9-]+$/)
        .min(3)
        .max(50),
      websiteGlobalConfig: Joi.alternatives().try(Joi.object()),
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
