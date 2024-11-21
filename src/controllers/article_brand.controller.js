const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { articleBrandService } = require('../services');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createArticleBrand = catchAsync(async (req, res) => {
  try {
    const document = await articleBrandService.createArticleBrand(req.body);

    res.status(httpStatus.CREATED).send(document);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
});

const getArticleBrands = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await articleBrandService.getArticleBrands(filter, options);
  res.send(result);
});

const getArticleBrandByArticleBrandInternalId = catchAsync(async (req, res) => {
  const articleBrand = await articleBrandService.getArticleBrandByInternalId(req.params.internalId);

  if (!articleBrand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Marca no encontrada, verifica el id.');
  }
  res.send(articleBrand);
});

const getArticleBrandsByUserId = catchAsync(async (req, res) => {
  const articleBrand = await articleBrandService.getArticleBrandsByUserId(req.params.userId);
  if (!articleBrand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Marca no encontrada, verificar Usuario Id.');
  }
  res.send(articleBrand);
});

const updateArticleBrand = catchAsync(async (req, res) => {
  const articleBrand = await articleBrandService.updateArticleBrand(req.body.internalId, req.body);

  res.send(articleBrand);
});

const deleteArticleBrand = catchAsync(async (req, res) => {
  await articleBrandService.deleteArticleBrand(req.body.internalId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createArticleBrand,
  getArticleBrands,
  getArticleBrandByArticleBrandInternalId,
  getArticleBrandsByUserId,
  updateArticleBrand,
  deleteArticleBrand,
};
