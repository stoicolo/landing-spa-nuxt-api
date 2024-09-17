const httpStatus = require('http-status');
const { Op, cast, literal } = require('sequelize');
const { PageTemplate } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Page Template
 * @param {Object} pageTemplateBody
 * @returns {Promise<PageTemplate>}
 */
const createPageTemplate = async (pageTemplateBody) => {
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

const getTemplatesByCategories = async (categories) => {
  return PageTemplate.findAll({
    where: {
      categories: {
        [Op.overlap]: cast(literal(`ARRAY[${categories.map((cat) => `'${cat}'`).join(',')}]`), 'text[]'),
      },
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
  getTemplatesByCategories,
  updatePageTemplateById,
  deletePageTemplateById,
};
