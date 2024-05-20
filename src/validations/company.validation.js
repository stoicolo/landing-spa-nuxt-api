const Joi = require('joi');

const createCompany = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string(),
    address: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.string(),
    contactName: Joi.string(),
    contactLastName: Joi.string(),
    contactEmail: Joi.string().email(),
    contactPhone: Joi.string(),
  }),
};

const getCompanies = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCompany = {
  params: Joi.object().keys({
    companyId: Joi.string(),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    companyId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
      address: Joi.string(),
      country: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zip: Joi.string(),
      contactName: Joi.string(),
      contactLastName: Joi.string(),
      contactEmail: Joi.string().email(),
      contactPhone: Joi.string(),
    })
    .min(1),
};

const deleteCompany = {
  params: Joi.object().keys({
    companyId: Joi.string(),
  }),
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
