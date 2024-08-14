const Joi = require('joi');

const getPublicWebsiteById = {
  params: Joi.object().keys({
    websiteId: Joi.string(),
  }),
};

const getPublicWebsiteByDomain = {
  params: Joi.object().keys({
    websiteDomain: Joi.string(),
  }),
};

const getPublicWebsiteBySlug = {
  params: Joi.object().keys({
    websiteSlug: Joi.string(),
  }),
};

module.exports = {
  getPublicWebsiteById,
  getPublicWebsiteByDomain,
  getPublicWebsiteBySlug,
};
