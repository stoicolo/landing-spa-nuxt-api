const httpStatus = require('http-status');
const { GenericCategory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Generic Category
 * @param {Object} genericCategoryBody
 * @returns {Promise<GenericCategory>}
 */
const createGenericCategory = async (genericCategoryBody) => {
  return GenericCategory.create(genericCategoryBody);
};

/**
 * Get Generic Category by id
 * @param {ObjectId} id
 * @returns {Promise<GenericCategory>}
 */
const getGenericCategoryById = async (id) => {
  return GenericCategory.findByPk(id);
};

/**
 * Query for Generic Category
 * @param {userId} userId
 * @returns {Promise<GenericCategory>}
 */
const getGenericCategoriesByUserId = async (userId) => {
  return GenericCategory.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update Generic Category by id
 * @param {ObjectId} genericCategoryId
 * @param {Object} updateBody
 * @returns {Promise<GenericCategory>}
 */
const updateGenericCategoryById = async (genericCategoryId, updateBody) => {
  const genericCategory = await getGenericCategoryById(genericCategoryId);

  if (!genericCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found, please check the id.');
  }
  Object.assign(genericCategory, updateBody);
  await genericCategory.save();
  return genericCategory;
};

/**
 * Delete Generic Category by id
 * @param {ObjectId} genericCategoryId
 * @returns {Promise<GenericCategory>}
 */
const deleteGenericCategoryById = async (genericCategoryId) => {
  const genericCategory = await getGenericCategoryById(genericCategoryId);
  if (!genericCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found, please check the id.');
  }
  await genericCategory.destroy();
  return genericCategory;
};

module.exports = {
  createGenericCategory,
  getGenericCategoryById,
  getGenericCategoriesByUserId,
  updateGenericCategoryById,
  deleteGenericCategoryById,
};
