const httpStatus = require('http-status');
const { ArticleCategory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an Article Category
 * @param {Object} articleCategoryBody
 * @returns {Promise<ArticleCategory>}
 */
const createArticleCategory = async (articleCategoryBody) => {
  try {
    const articleCategory = await ArticleCategory.create(articleCategoryBody);
    return articleCategory;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get Article Category by articleCategoryInternalId
 * @param {ObjectId} articleCategoryInternalId
 * @returns {Promise<ArticleCategory>}
 */
const getArticleCategoryByInternalId = async (articleCategoryInternalId) => {
  return ArticleCategory.findOne({
    where: {
      internalId: articleCategoryInternalId,
    },
  });
};

/**
 * Query for Article Category
 * @param {userId} userId
 * @returns {Promise<ArticleCategory>}
 */
const getArticleCategoriesByUserId = async (userId) => {
  return ArticleCategory.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Query for Article Categories
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getArticleCategories = async (filter, options) => {
  const articleCategorys = await ArticleCategory.paginate(filter, options);
  return articleCategorys;
};

/**
 * Update articleCategory by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<ArticleCategory>}
 */
const updateArticleCategory = async (id, updateBody) => {
  const articleCategory = await getArticleCategoryByInternalId(id);

  if (!articleCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categoria no encontrado, verifica el id.');
  }

  const { ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(articleCategory, updateBodyWithoutColumnsNotEditable);

  await articleCategory.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return articleCategory;
};

/**
 * Delete articleCategory by id
 * @param {ObjectId} articleCategoryInternalId
 * @returns {Promise<ArticleCategory>}
 */
const deleteArticleCategory = async (articleCategoryInternalId) => {
  const articleCategory = await getArticleCategoryByInternalId(articleCategoryInternalId);

  if (!articleCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categoria no encontrado, verifica el id.');
  }
  await articleCategory.destroy();
  return articleCategory;
};

module.exports = {
  createArticleCategory,
  getArticleCategories,
  getArticleCategoryByInternalId,
  getArticleCategoriesByUserId,
  updateArticleCategory,
  deleteArticleCategory,
};
