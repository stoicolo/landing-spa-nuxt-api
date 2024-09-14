const httpStatus = require('http-status');
const { GenericTemplate } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Generic Template
 * @param {Object} genericTemplateBody
 * @returns {Promise<GenericTemplate>}
 */
const createGenericTemplate = async (genericTemplateBody) => {
  return GenericTemplate.create(genericTemplateBody);
};

/**
 * Get Generic Template by id
 * @param {ObjectId} id
 * @returns {Promise<GenericTemplate>}
 */
const getGenericTemplateById = async (id) => {
  return GenericTemplate.findByPk(id);
};

/**
 * Query for Generic Template
 * @param {userId} userId
 * @returns {Promise<GenericTemplate>}
 */
const getGenericTemplatesByUserId = async (userId) => {
  return GenericTemplate.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update Generic Template by id
 * @param {ObjectId} genericTemplateId
 * @param {Object} updateBody
 * @returns {Promise<GenericTemplate>}
 */
const updateGenericTemplateById = async (genericTemplateId, updateBody) => {
  const genericTemplate = await getGenericTemplateById(genericTemplateId);

  if (!genericTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Web page not found, please check the id.');
  }
  Object.assign(genericTemplate, updateBody);
  await genericTemplate.save();
  return genericTemplate;
};

/**
 * Delete Generic Template by id
 * @param {ObjectId} genericTemplateId
 * @returns {Promise<GenericTemplate>}
 */
const deleteGenericTemplateById = async (genericTemplateId) => {
  const genericTemplate = await getGenericTemplateById(genericTemplateId);
  if (!genericTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Web page not found, please check the id.');
  }
  await genericTemplate.destroy();
  return genericTemplate;
};

module.exports = {
  createGenericTemplate,
  getGenericTemplateById,
  getGenericTemplatesByUserId,
  updateGenericTemplateById,
  deleteGenericTemplateById,
};
