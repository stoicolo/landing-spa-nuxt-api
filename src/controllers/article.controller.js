const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { articleService } = require('../services');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createArticle = catchAsync(async (req, res) => {
  try {
    const document = await articleService.createArticle(req.body);

    res.status(httpStatus.CREATED).send(document);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
});

const getArticles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await articleService.getArticles(filter, options);
  res.send(result);
});

const getArticleByArticleInternalId = catchAsync(async (req, res) => {
  const article = await articleService.getArticleByInternalId(req.params.internalId);

  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Articulo no encontrada, verifica el id.');
  }
  res.send(article);
});

const getArticlesByUserId = catchAsync(async (req, res) => {
  const article = await articleService.getArticlesByUserId(req.params.userId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Articulo no encontrada, verificar Usuario Id.');
  }
  res.send(article);
});

const updateArticle = catchAsync(async (req, res) => {
  const article = await articleService.updateArticle(req.body.internalId, req.body);

  res.send(article);
});

const deleteArticle = catchAsync(async (req, res) => {
  await articleService.deleteArticle(req.body.internalId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createArticle,
  getArticles,
  getArticleByArticleInternalId,
  getArticlesByUserId,
  updateArticle,
  deleteArticle,
};
