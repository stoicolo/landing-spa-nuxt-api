const httpStatus = require('http-status');
const { Agent } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a agent
 * @param {Object} agentBody
 * @returns {Promise<Agent>}
 */
const createAgent = async (agentBody) => {
  try {
    const agent = await Agent.create(agentBody);
    return agent;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get Agent by agentInternalId
 * @param {ObjectId} agentInternalId
 * @returns {Promise<Agent>}
 */
const getCouponsByAgentId = async (userId) => {
  return Agent.findAll({
    where: {
      agentId: userId,
    },
  });
};

/**
 * Get Agent by agentInternalId
 * @param {ObjectId} agentInternalId
 * @returns {Promise<Agent>}
 */
const getAgentByInternalId = async (agentInternalId) => {
  return Agent.findOne({
    where: {
      internalId: agentInternalId,
    },
  });
};

/**
 * Query for Agents
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAgents = async (filter, options) => {
  const agents = await Agent.paginate(filter, options);
  return agents;
};

/**
 * Update agent by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Agent>}
 */
const updateAgent = async (id, updateBody) => {
  const agent = await getAgentByInternalId(id);

  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agente no encontrado, verifica el id.');
  }

  const { internalId, agentId, internalCouponId, ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(agent, updateBodyWithoutColumnsNotEditable);

  await agent.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return agent;
};

/**
 * Delete agent by id
 * @param {ObjectId} agentInternalId
 * @returns {Promise<Agent>}
 */
const deleteAgent = async (agentInternalId) => {
  const agent = await getAgentByInternalId(agentInternalId);

  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agente no encontrado, verifica el id.');
  }
  await agent.destroy();
  return agent;
};

module.exports = {
  createAgent,
  getAgents,
  getAgentByInternalId,
  updateAgent,
  deleteAgent,
  getCouponsByAgentId,
};
