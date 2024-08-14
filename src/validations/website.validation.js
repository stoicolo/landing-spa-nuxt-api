const Joi = require('joi');

const createWebsite = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    websiteName: Joi.string().required(),
    domain: Joi.string().required(),
    slug: Joi.string().required(),
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
      websiteName: Joi.string(),
      domain: Joi.string(),
      slug: Joi.string(),
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
