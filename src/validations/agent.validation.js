const Joi = require('joi');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const createAgent = {
  body: Joi.object().keys({
    agentId: Joi.number().integer().positive().required(),
    internalCouponId: Joi.string().guid({ version: 'uuidv4' }).required(),
    agentType: Joi.string().required(),
  }),
};

const getAgents = {
  query: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const getCouponsByAgentId = {
  params: Joi.object().keys({
    agentId: Joi.number().integer().positive().required(),
  }),
};

const getAgentByInternalId = {
  params: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const updateAgent = {
  body: Joi.object()
    .keys({
      internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
      agentId: Joi.number().integer().positive(),
      internalCouponId: Joi.string().guid({ version: 'uuidv4' }),
      agentType: Joi.string(),
    })
    .min(1),
};

const deleteAgent = {
  body: Joi.object().keys({
    internalId: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
};

module.exports = {
  createAgent,
  getAgents,
  getCouponsByAgentId,
  getAgentByInternalId,
  updateAgent,
  deleteAgent,
};
