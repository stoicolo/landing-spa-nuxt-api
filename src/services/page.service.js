const httpStatus = require('http-status');
const { Page } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a page
 * @param {Object} pageBody
 * @returns {Promise<Page>}
 */
const createPage = async (pageBody) => {
  // if (await Page.isCompanyPageTaken(pageBody.companyId)) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'La Página Web ya tiene un Page Template Backup previamente asignado, prueba con otra Página Web.'
  //   );
  // }

  return Page.create(pageBody);
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
