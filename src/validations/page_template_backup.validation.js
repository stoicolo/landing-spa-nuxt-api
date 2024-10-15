const Joi = require('joi');

const createPageTemplateBackup = {
  body: Joi.object().keys({
    backupName: Joi.string().required(),
    pageTemplateId: Joi.number().required(),
    userId: Joi.number().required(),
    pageId: Joi.number().required(),
    pageName: Joi.string().required(),
    sections: Joi.array().items(Joi.object()),
    categories: Joi.array().items(Joi.string()).required(),
  }),
};

const getPageTemplateBackup = {
  body: Joi.object().keys({
    pageTemplateBackupId: Joi.number().required(),
  }),
};

const getPageTemplateBackupsByUserId = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getPageTemplateBackupsByName = {
  body: Joi.object().keys({
    backupName: Joi.string().required(),
    userId: Joi.number().required(),
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

const updatePageTemplateBackup = {
  body: Joi.object()
    .keys({
      pageTemplateBackupId: Joi.number().required(),
      userId: Joi.number().required(),
      backupName: Joi.string(),
      pageTemplateId: Joi.number(),
      pageName: Joi.string(),
      sections: Joi.array().items(Joi.object()),
      categories: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deledeletePageTemplateBackup = {
  body: Joi.object().keys({
    pageTemplateBackupId: Joi.number().required(),
  }),
};

module.exports = {
  createPageTemplateBackup,
  getPageTemplateBackup,
  getPageTemplateBackupsByUserId,
  getPageTemplateBackupsByName,
  getTemplatesByCategories,
  updatePageTemplateBackup,
  deledeletePageTemplateBackup,
};
