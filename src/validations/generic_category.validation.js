const Joi = require('joi');

const createGenericCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    models: Joi.array().items(Joi.string()).required(),
    hidden: Joi.boolean().default(false),
    userId: Joi.number().required(),
  }),
};

const getGenericCategory = {
  params: Joi.object().keys({
    genericCategoryId: Joi.number().required(),
  }),
};

const getGenericCategoriesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const updateGenericCategory = {
  params: Joi.object().keys({
    genericCategoryId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      models: Joi.array().items(Joi.string()),
      hidden: Joi.boolean().default(false),
    })
    .min(1),
};

const deleteGenericCategory = {
  params: Joi.object().keys({
    genericCategoryId: Joi.number().required(),
  }),
};

module.exports = {
  createGenericCategory,
  getGenericCategory,
  getGenericCategoriesByUserId,
  updateGenericCategory,
  deleteGenericCategory,
};
