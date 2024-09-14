const Joi = require('joi');

const createGenericTemplate = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    sections: Joi.array().items(Joi.object()),
  }),
};

const getGenericTemplate = {
  params: Joi.object().keys({
    genericTemplateId: Joi.number().required(),
  }),
};

const getGenericTemplatesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
  body: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const updateGenericTemplate = {
  params: Joi.object().keys({
    genericTemplateId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      sections: Joi.array().items(Joi.object()),
    })
    .min(1),
};

const deleteGenericTemplate = {
  params: Joi.object().keys({
    genericTemplateId: Joi.number().required(),
  }),
};

module.exports = {
  createGenericTemplate,
  getGenericTemplate,
  getGenericTemplatesByUserId,
  updateGenericTemplate,
  deleteGenericTemplate,
};
