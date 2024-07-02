const Joi = require('joi');

const createPage = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    templateId: Joi.number().required(),
    pageName: Joi.string().required(),
    websiteId: Joi.number().required(),
  }),
};

const getPages = {
  params: Joi.object().keys({
    pageId: Joi.number().required(),
  }),
};

const getPagesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
  query: Joi.object().keys({
    templateId: Joi.number(),
    userId: Joi.number(),
    pageName: Joi.string(),
    websiteId: Joi.number(),
  }),
};

const getPageByName = {
  params: Joi.object().keys({
    pageName: Joi.string(),
  }),
  query: Joi.object().keys({
    templateId: Joi.number(),
    userId: Joi.number(),
    pageName: Joi.string(),
    websiteId: Joi.number(),
  }),
};

const updatePage = {
  params: Joi.object().keys({
    pageId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      pageName: Joi.string(),
    })
    .min(1),
};

const deletePage = {
  params: Joi.object().keys({
    pageId: Joi.number().required(),
  }),
};

module.exports = {
  createPage,
  getPages,
  getPagesByUserId,
  getPageByName,
  updatePage,
  deletePage,
};
