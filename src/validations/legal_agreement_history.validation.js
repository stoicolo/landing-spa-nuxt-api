const Joi = require('joi');

const createLegalAgreementHistory = {
  body: Joi.object().keys({
    legalAgreementId: Joi.number().required(),
    userId: Joi.number().required(),
    agreed: Joi.boolean().required(),
    agreementDate: Joi.date().required(),
  }),
};

const getLegalAgreementHistories = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const getLegalAgreementHistoriesByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getLegalAgreementHistoryById = {
  query: Joi.object().keys({
    legalAgreementId: Joi.number().required(),
  }),
};

const updateLegalAgreementHistory = {
  body: Joi.object()
    .keys({
      legalAgreementId: Joi.number().required(),
      userId: Joi.number().required(),
      agreed: Joi.boolean().required(),
      agreementDate: Joi.date,
    })
    .min(1),
};

const deleteLegalAgreementHistory = {
  query: Joi.object().keys({
    legalAgreementId: Joi.number().required(),
  }),
};

module.exports = {
  createLegalAgreementHistory,
  getLegalAgreementHistories,
  getLegalAgreementHistoriesByUserId,
  getLegalAgreementHistoryById,
  updateLegalAgreementHistory,
  deleteLegalAgreementHistory,
};
