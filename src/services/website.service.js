const httpStatus = require('http-status');
const { Website } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for website name
 * @param {userId} userId
 * @returns {Promise<WebsiteTemplateBackup>}
 */
const getWebsiteByName = async (websiteName) => {
  return Website.findOne({
    where: {
      websiteName,
    },
  });
};

/**
 * Create a website
 * @param {Object} websiteBody
 * @returns {Promise<Website>}
 */
const createWebsite = async (websiteBody) => {
  try {
    const website = await getWebsiteByName(websiteBody.websiteName);

    if (website) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'El nombre del Sitio Web ya existe, prueba con otro nombre.');
    }

    return Website.create(websiteBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Get website by id
 * @param {ObjectId} id
 * @returns {Promise<Website>}
 */
const getWebsiteById = async (id) => {
  return Website.findByPk(id);
};

/**
 * Query for websites
 * @param {userId} userId
 * @returns {Promise<Website>}
 */
const getWebsitesByUserId = async (userId) => {
  return Website.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update website by id
 * @param {ObjectId} websiteId
 * @param {Object} updateBody
 * @returns {Promise<Website>}
 */
const updateWebsiteById = async (websiteId, updateBody) => {
  const website = await getWebsiteById(websiteId);

  if (!website) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sitio Web no encontrada, verifica el id.');
  }
  Object.assign(website, updateBody);
  await website.save();
  return website;
};

/**
 * Delete website by id
 * @param {ObjectId} websiteId
 * @returns {Promise<Website>}
 */
const deleteWebsiteById = async (websiteId) => {
  const website = await getWebsiteById(websiteId);
  if (!website) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sitio Web no encontrada, verifica el id.');
  }
  await website.destroy();
  return website;
};

module.exports = {
  createWebsite,
  getWebsiteById,
  getWebsitesByUserId,
  getWebsiteByName,
  updateWebsiteById,
  deleteWebsiteById,
};
