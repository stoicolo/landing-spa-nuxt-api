const httpStatus = require('http-status');
const { PublishHistory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get PublishHistory by Website id
 * @param {websiteId} websiteId
 * @returns {Promise<PublishHistory>}
 */
const getPublishHistoriesByWebsiteId = async (websiteId) => {
  return PublishHistory.findAll({
    where: {
      websiteId,
    },
  });
};

/**
 * Create a publishHistory record
 * @param {Object} publishHistoryBody
 * @returns {Promise<PublishHistory>}
 */
const createPublishHistory = async (publishHistoryBody) => {
  try {
    const publishHistory = await getPublishHistoriesByWebsiteId(publishHistoryBody.websiteId);

    if (publishHistory && publishHistory.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'El Website ya fué publicado, puede actualizarlo o eliminarlo.');
    }

    return PublishHistory.create(publishHistoryBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Get publishHistory by id
 * @param {ObjectId} id
 * @returns {Promise<PublishHistory>}
 */
const getPublishHistoryById = async (id) => {
  return PublishHistory.findByPk(id);
};

/**
 * Update publishHistory by id
 * @param {ObjectId} publishHistoryId
 * @param {Object} updateBody
 * @returns {Promise<PublishHistory>}
 */
const updatePublishHistoryById = async (publishHistoryId, updateBody) => {
  const publishHistory = await getPublishHistoryById(publishHistoryId);
  const updatedBody = { ...updateBody };

  if (!publishHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Website no se puede publicar, verifica el id.');
  }

  if (updatedBody.publishedAt) {
    updatedBody.publishedAt = new Date(updatedBody.publishedAt);
    publishHistory.setDataValue('publishedAt', updatedBody.publishedAt);
  }

  Object.assign(publishHistory, updatedBody);
  publishHistory.changed('publishedAt', true); // Forzar la actualización de publishedAt
  await publishHistory.save({ silent: false });

  return publishHistory;
};

/**
 * Delete publishHistory by id
 * @param {ObjectId} publishHistoryId
 * @returns {Promise<PublishHistory>}
 */
const deletePublishHistoryById = async (publishHistoryId) => {
  const publishHistory = await getPublishHistoryById(publishHistoryId);

  if (!publishHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Website no encontrada, verifica el id.');
  }
  await publishHistory.destroy();
  return publishHistory;
};

module.exports = {
  createPublishHistory,
  getPublishHistoryById,
  getPublishHistoriesByWebsiteId,
  updatePublishHistoryById,
  deletePublishHistoryById,
};
