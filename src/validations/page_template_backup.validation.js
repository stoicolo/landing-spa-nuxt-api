const Joi = require('joi');

const createPageTemplateBackup = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    sections: Joi.array().items(Joi.object()),
  }),
};

const getPageTemplateBackup = {
  params: Joi.object().keys({
    pageTemplateBackupId: Joi.number().required(),
  }),
};

const getPageTemplateBackupsByUserId = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
  query: Joi.object().keys({
    sections: Joi.array().items(Joi.object()),
    userId: Joi.number(),
  }),
};

const updatePageTemplateBackup = {
  params: Joi.object().keys({
    pageTemplateBackupId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      sections: Joi.array().items(Joi.object()),
    })
    .min(1),
};

const deledeletePageTemplateBackup = {
  params: Joi.object().keys({
    pageTemplateBackupId: Joi.number().required(),
  }),
};

module.exports = {
  createPageTemplateBackup,
  getPageTemplateBackup,
  getPageTemplateBackupsByUserId,
  updatePageTemplateBackup,
  deledeletePageTemplateBackup,
};
