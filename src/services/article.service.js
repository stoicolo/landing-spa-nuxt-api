const httpStatus = require('http-status');
const { Article } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an Article
 * @param {Object} articleBrandBody
 * @returns {Promise<Article>}
 */
const createArticle = async (articleBrandBody) => {
  try {
    const articleBrand = await Article.create(articleBrandBody);
    return articleBrand;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get Article  by InternalId
 * @param {ObjectId} articleBrandInternalId
 * @returns {Promise<Article>}
 */
const getArticleByInternalId = async (articleBrandInternalId) => {
  return Article.findOne({
    where: {
      internalId: articleBrandInternalId,
    },
  });
};

/**
 * Query for Article
 * @param {userId} userId
 * @returns {Promise<Article>}
 */
const getArticlesByUserId = async (userId) => {
  return Article.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Query for Article
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getArticles = async (filter, options) => {
  const article = await Article.paginate(filter, options);
  return article;
};

/**
 * Update Article by Id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Article>}
 */
const updateArticle = async (id, updateBody) => {
  const articleBrand = await getArticleByInternalId(id);

  if (!articleBrand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Articulo no encontrado, verifica el id.');
  }

  const { ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(articleBrand, updateBodyWithoutColumnsNotEditable);

  await articleBrand.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return articleBrand;
};

/**
 * Delete Article by id
 * @param {ObjectId} articleBrandInternalId
 * @returns {Promise<Article>}
 */
const deleteArticle = async (articleBrandInternalId) => {
  const articleBrand = await getArticleByInternalId(articleBrandInternalId);

  if (!articleBrand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Articulo no encontrado, verifica el id.');
  }
  await articleBrand.destroy();
  return articleBrand;
};

module.exports = {
  createArticle,
  getArticles,
  getArticleByInternalId,
  getArticlesByUserId,
  updateArticle,
  deleteArticle,
};
