const httpStatus = require('http-status');
const { ArticleBrand } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an Article Category
 * @param {Object} articleBrandBody
 * @returns {Promise<ArticleBrand>}
 */
const createArticleBrand = async (articleBrandBody) => {
  try {
    const articleBrand = await ArticleBrand.create(articleBrandBody);
    return articleBrand;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get Article Category by articleBrandInternalId
 * @param {ObjectId} articleBrandInternalId
 * @returns {Promise<ArticleBrand>}
 */
const getArticleBrandByInternalId = async (articleBrandInternalId) => {
  return ArticleBrand.findOne({
    where: {
      internalId: articleBrandInternalId,
    },
  });
};

/**
 * Query for Article Category
 * @param {userId} userId
 * @returns {Promise<ArticleBrand>}
 */
const getArticleBrandsByUserId = async (userId) => {
  return ArticleBrand.findAll({
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
const getArticleBrands = async (filter, options) => {
  const articleBrands = await ArticleBrand.paginate(filter, options);
  return articleBrands;
};

/**
 * Update articleBrand by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<ArticleBrand>}
 */
const updateArticleBrand = async (id, updateBody) => {
  const articleBrand = await getArticleBrandByInternalId(id);

  if (!articleBrand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categoria no encontrado, verifica el id.');
  }

  const { ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(articleBrand, updateBodyWithoutColumnsNotEditable);

  await articleBrand.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return articleBrand;
};

/**
 * Delete articleBrand by id
 * @param {ObjectId} articleBrandInternalId
 * @returns {Promise<ArticleBrand>}
 */
const deleteArticleBrand = async (articleBrandInternalId) => {
  const articleBrand = await getArticleBrandByInternalId(articleBrandInternalId);

  if (!articleBrand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categoria no encontrado, verifica el id.');
  }
  await articleBrand.destroy();
  return articleBrand;
};

module.exports = {
  createArticleBrand,
  getArticleBrands,
  getArticleBrandByInternalId,
  getArticleBrandsByUserId,
  updateArticleBrand,
  deleteArticleBrand,
};
