const Joi = require('joi');

const createWidget = {
  body: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string(),
    image: Joi.string(),
    available: Joi.boolean(),
    element: Joi.object(),
  }),
};

const getWidget = {
  params: Joi.object().keys({
    widgetId: Joi.number(),
  }),
};

const getWidgets = {
  params: Joi.object().keys({
    widgetId: Joi.number(),
  }),
  query: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string(),
    image: Joi.string(),
    available: Joi.boolean(),
    element: Joi.object(),
  }),
};

const updateWidget = {
  params: Joi.object().keys({
    widgetId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      category: Joi.string(),
      image: Joi.string(),
      available: Joi.boolean(),
      element: Joi.object(),
    })
    .min(1),
};

const deleteWidget = {
  params: Joi.object().keys({
    widgetId: Joi.number().required(),
  }),
};

module.exports = {
  createWidget,
  getWidget,
  getWidgets,
  updateWidget,
  deleteWidget,
};
