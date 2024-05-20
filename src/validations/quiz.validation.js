const Joi = require('joi');

const createQuiz = {
  body: Joi.object().keys({
    companyId: Joi.number().required(),
    preg1: Joi.string(),
    preg2: Joi.array().items(Joi.boolean()),
    preg3: Joi.string(),
    preg4: Joi.number(),
    preg5: Joi.number(),
    preg5_type: Joi.string(),
    preg6: Joi.number(),
    preg7: Joi.number(),
    preg8: Joi.number(),
    preg9: Joi.number(),
    preg9_content: Joi.string(),
    preg10: Joi.number(),
    preg10_content: Joi.string(),
    preg11: Joi.number(),
  }),
};

const getQuizes = {
  params: Joi.object().keys({
    companyId: Joi.number(),
  }),
  query: Joi.object().keys({
    preg1: Joi.string(),
    preg2: Joi.array().items(Joi.boolean()),
    preg3: Joi.string(),
    preg4: Joi.number(),
    preg5: Joi.number(),
    preg5_type: Joi.string(),
    preg6: Joi.number(),
    preg7: Joi.number(),
    preg8: Joi.number(),
    preg9: Joi.number(),
    preg9_content: Joi.string(),
    preg10: Joi.number(),
    preg10_content: Joi.string(),
    preg11: Joi.number(),
  }),
};

const getQuiz = {
  params: Joi.object().keys({
    companyId: Joi.number().required(),
  }),
};

const updateQuiz = {
  params: Joi.object().keys({
    companyId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      preg1: Joi.string(),
      preg2: Joi.array().items(Joi.boolean()),
      preg3: Joi.string(),
      preg4: Joi.number(),
      preg5: Joi.number(),
      preg5_type: Joi.string(),
      preg6: Joi.number(),
      preg7: Joi.number(),
      preg8: Joi.number(),
      preg9: Joi.number(),
      preg9_content: Joi.string(),
      preg10: Joi.number(),
      preg10_content: Joi.string(),
      preg11: Joi.number(),
    })
    .min(1),
};

const deleteQuiz = {
  params: Joi.object().keys({
    companyId: Joi.number().required(),
  }),
};

module.exports = {
  createQuiz,
  getQuizes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};
