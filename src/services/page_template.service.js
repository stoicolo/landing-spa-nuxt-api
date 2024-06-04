const httpStatus = require('http-status');
const { PageTemplate } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a pageTemplate
 * @param {Object} pageTemplateBody
 * @returns {Promise<PageTemplate>}
 */
const createPageTemplate = async (pageTemplateBody) => {
  // if (await PageTemplate.isCompanyQuizTaken(pageTemplateBody.companyId)) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'La Página Web ya tiene un PageTemplate previamente asignado, prueba con otra Página Web.'
  //   );
  // }

  return PageTemplate.create(pageTemplateBody);
};

/**
 * Get pageTemplateI by id
 * @param {ObjectId} id
 * @returns {Promise<PageTemplate>}
 */
const getPageTemplateById = async (id) => {
  return PageTemplate.findByPk(id);
};

/**
 * Query for pageTemplates
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getPageTemplates = async (filter, options) => {
  const { limit, offset } = options;
  const quizes = await PageTemplate.findAll({
    where: filter,
    limit,
    offset,
  });
  return quizes;
};

/**
 * Get pageTemplate by email
 * @param {string} email
 * @returns {Promise<PageTemplate>}
 */
const getPageTemplateByEmail = async (email) => {
  return PageTemplate.findOne({ email });
};

/**
 * Update pageTemplate by id
 * @param {ObjectId} pageTemplateId
 * @param {Object} updateBody
 * @returns {Promise<PageTemplate>}
 */
const updatePageTemplateById = async (pageTemplateId, updateBody) => {
  const pageTemplate = await getPageTemplateById(pageTemplateId);

  if (!pageTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  if (updateBody.email && (await PageTemplate.isEmailTaken(updateBody.email, pageTemplateId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ese email ya esta en uso, prueba con otro.');
  }
  Object.assign(pageTemplate, updateBody);
  await pageTemplate.save();
  return pageTemplate;
};

/**
 * Delete pageTemplate by id
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
  getPageTemplates,
  getPageTemplateByEmail,
  updatePageTemplateById,
  deletePageTemplateById,
};
