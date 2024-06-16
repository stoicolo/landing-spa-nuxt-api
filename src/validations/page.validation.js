const Joi = require('joi');

const createPage = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    templateId: Joi.number().required(),
    pageName: Joi.string().required(),
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
