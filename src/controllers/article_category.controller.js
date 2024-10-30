const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { articleCategoryService } = require('../services');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createArticleCategory = catchAsync(async (req, res) => {
  try {
    const document = await articleCategoryService.createArticleCategory(req.body);

    res.status(httpStatus.CREATED).send(document);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
});

const getArticleCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await articleCategoryService.getArticleCategories(filter, options);
  res.send(result);
});

const getArticleCategoryByArticleCategoryInternalId = catchAsync(async (req, res) => {
  const articleCategory = await articleCategoryService.getArticleCategoryByInternalId(req.params.internalId);

  if (!articleCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categoria no encontrada, verifica el id.');
  }
  res.send(articleCategory);
});

const getArticleCategoriesByUserId = catchAsync(async (req, res) => {
  const articleCategory = await articleCategoryService.getArticleCategoriesByUserId(req.params.userId);
  if (!articleCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categoria no encontrada, verificar Usuario Id.');
  }
  res.send(articleCategory);
});

const updateArticleCategory = catchAsync(async (req, res) => {
  const articleCategory = await articleCategoryService.updateArticleCategory(req.body.internalId, req.body);

  res.send(articleCategory);
});

const deleteArticleCategory = catchAsync(async (req, res) => {
  await articleCategoryService.deleteArticleCategory(req.body.internalId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createArticleCategory,
  getArticleCategories,
  getArticleCategoryByArticleCategoryInternalId,
  getArticleCategoriesByUserId,
  updateArticleCategory,
  deleteArticleCategory,
};
