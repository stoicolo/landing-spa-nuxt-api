const httpStatus = require('http-status');
const { Page } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for page name
 * @param {userId} userId
 * @returns {Promise<PageTemplateBackup>}
 */
const getPageByName = async (pageName) => {
  return Page.findOne({
    where: {
      pageName,
    },
  });
};

/**
 * Query for page name, user id, website id
 * @param {userId} userId
 * @returns {Promise<PageTemplateBackup>}
 */
const getPageByNameUserIdWebsiteId = async (pageName, userId, websiteId) => {
  return Page.findOne({
    where: {
      pageName,
      userId,
      websiteId,
    },
  });
};

/**
 * Create a page
 * @param {Object} pageBody
 * @returns {Promise<Page>}
 */
const createPage = async (pageBody) => {
  try {
    const page = await getPageByNameUserIdWebsiteId(pageBody.pageName, pageBody.userId, pageBody.websiteId);

    if (page) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'El nombre del Page ya existe, prueba con otro nombre.');
    }

    return Page.create(pageBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Get page by id
 * @param {ObjectId} id
 * @returns {Promise<Page>}
 */
const getPageById = async (id) => {
  return Page.findByPk(id);
};

/**
 * Query for pages
 * @param {userId} userId
 * @returns {Promise<Page>}
 */
const getPagesByUserId = async (userId) => {
  return Page.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update page by id
 * @param {ObjectId} pageId
 * @param {Object} updateBody
 * @returns {Promise<Page>}
 */
const updatePageById = async (pageId, updateBody) => {
  const page = await getPageById(pageId);

  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  Object.assign(page, updateBody);
  await page.save();
  return page;
};

/**
 * Delete page by id
 * @param {ObjectId} pageId
 * @returns {Promise<Page>}
 */
const deletePageById = async (pageId) => {
  const page = await getPageById(pageId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  await page.destroy();
  return page;
};

module.exports = {
  createPage,
  getPageById,
  getPagesByUserId,
  getPageByName,
  updatePageById,
  deletePageById,
};
