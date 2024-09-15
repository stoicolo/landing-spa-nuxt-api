const Joi = require('joi');

const createPageTemplate = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    sections: Joi.array().items(Joi.object()),
    categories: Joi.array().items(Joi.string()).required(),
  }),
};

const getPageTemplate = {
  params: Joi.object().keys({
    pageTemplateId: Joi.number().required(),
  }),
};

const getPageTemplatesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
  body: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const updatePageTemplate = {
  params: Joi.object().keys({
    pageTemplateId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      sections: Joi.array().items(Joi.object()),
      categories: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deletePageTemplate = {
  params: Joi.object().keys({
    pageTemplateId: Joi.number().required(),
  }),
};

module.exports = {
  createPageTemplate,
  getPageTemplate,
  getPageTemplatesByUserId,
  updatePageTemplate,
  deletePageTemplate,
};
