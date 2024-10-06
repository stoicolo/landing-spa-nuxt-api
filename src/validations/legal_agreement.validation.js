const Joi = require('joi');

const createLegalAgreement = {
  body: Joi.object().keys({
    docId: Joi.number().required(),
    registerUserId: Joi.number().required(),
    lastModifierUserId: Joi.number(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    active: Joi.boolean().required(),
    releaseDate: Joi.string(),
    registrationDate: Joi.string().required(),
  }),
};

const getLegalAgreements = {
  query: Joi.object().keys({
    docId: Joi.number(),
  }),
};

const getLegalAgreementsByUserId = {
  query: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getLegalAgreementById = {
  query: Joi.object().keys({
    docId: Joi.number(),
  }),
};

const updateLegalAgreement = {
  body: Joi.object()
    .keys({
      docId: Joi.number().required(),
      lastModifierUserId: Joi.number(),
      description: Joi.string().required(),
      active: Joi.boolean().required(),
    })
    .min(1),
};

const deleteLegalAgreement = {
  query: Joi.object().keys({
    pageId: Joi.number().required(),
  }),
};

module.exports = {
  createLegalAgreement,
  getLegalAgreements,
  getLegalAgreementsByUserId,
  getLegalAgreementById,
  updateLegalAgreement,
  deleteLegalAgreement,
};
