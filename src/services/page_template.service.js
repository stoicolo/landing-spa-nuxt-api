const httpStatus = require('http-status');
const { PageTemplate } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Page Template
 * @param {Object} pageTemplateBody
 * @returns {Promise<PageTemplate>}
 */
const createPageTemplate = async (pageTemplateBody) => {
  // if (await PageTemplate.isCompanyPageTemplateTaken(pageTemplateBody.companyId)) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'La Página Web ya tiene un PageTemplate previamente asignado, prueba con otra Página Web.'
  //   );
  // }

  return PageTemplate.create(pageTemplateBody);
};

/**
 * Get Page Template by id
 * @param {ObjectId} id
 * @returns {Promise<PageTemplate>}
 */
const getPageTemplateById = async (id) => {
  return PageTemplate.findByPk(id);
};

/**
 * Query for Page Template
 * @param {userId} userId
 * @returns {Promise<PageTemplate>}
 */
const getPageTemplatesByUserId = async (userId) => {
  return PageTemplate.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update Page Template by id
 * @param {ObjectId} pageTemplateId
 * @param {Object} updateBody
 * @returns {Promise<PageTemplate>}
 */
const updatePageTemplateById = async (pageTemplateId, updateBody) => {
  const pageTemplate = await getPageTemplateById(pageTemplateId);

  if (!pageTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  Object.assign(pageTemplate, updateBody);
  await pageTemplate.save();
  return pageTemplate;
};

/**
 * Delete Page Template by id
 * @param {ObjectId} pageTemplateId
 * @returns {Promise<PageTemplate>}
 */
const deletePageTemplateById = async (pageTemplateId) => {
  const pageTemplate = await getPageTemplateById(pageTemplateId);
  if (!pageTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  await pageTemplate.destroy();
  return pageTemplate;
};

module.exports = {
  createPageTemplate,
  getPageTemplateById,
  getPageTemplatesByUserId,
  updatePageTemplateById,
  deletePageTemplateById,
};
