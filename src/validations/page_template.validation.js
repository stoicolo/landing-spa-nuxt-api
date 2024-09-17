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

const getTemplatesByCategories = {
  query: Joi.object().keys({
    categories: Joi.string()
      .custom((value, helpers) => {
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed)) {
            return helpers.error('string.base');
          }
          return parsed;
        } catch (error) {
          return helpers.error('string.base');
        }
      })
      .required(),
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
  getTemplatesByCategories,
  updatePageTemplate,
  deletePageTemplate,
};
