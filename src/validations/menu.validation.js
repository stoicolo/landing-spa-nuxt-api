const Joi = require('joi');

const createMenu = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    templateId: Joi.number().required(),
    menuName: Joi.string().required(),
    websiteId: Joi.number().required(),
  }),
};

const getMenu = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
    websiteId: Joi.number().required(),
    menuId: Joi.number().required(),
  }),
};

const updateMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      menuName: Joi.string(),
    })
    .min(1),
};

const deleteMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().required(),
  }),
};

module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
};
