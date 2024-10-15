const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { agentService } = require('../services');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createAgent = catchAsync(async (req, res) => {
  try {
    const document = await agentService.createAgent(req.body);

    res.status(httpStatus.CREATED).send(document);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
});

const getAgents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await agentService.getAgents(filter, options);

  res.send(result);
});

const getCouponsByAgentId = catchAsync(async (req, res) => {
  const coupons = await agentService.getCouponsByAgentId(req.params.agentId);

  if (!coupons) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupones no encontrados, verifica el agente id.');
  }
  res.send(coupons);
});

const getAgentByInternalId = catchAsync(async (req, res) => {
  const agent = await agentService.getAgentByInternalId(req.params.internalId);

  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agente no encontrado, verifica el agente id.');
  }
  res.send(agent);
});

const updateAgent = catchAsync(async (req, res) => {
  const agent = await agentService.updateAgent(req.body.internalId, req.body);

  res.send(agent);
});

const deleteAgent = catchAsync(async (req, res) => {
  await agentService.deleteAgent(req.body.internalId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAgent,
  getAgents,
  getCouponsByAgentId,
  getAgentByInternalId,
  updateAgent,
  deleteAgent,
};
