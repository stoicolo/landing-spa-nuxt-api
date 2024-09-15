const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { genericCategoryService } = require('../services');

const createGenericCategory = catchAsync(async (req, res) => {
  const genericCategory = await genericCategoryService.createGenericCategory(req.body);
  res.status(httpStatus.CREATED).send(genericCategory);
});

const getGenericCategory = catchAsync(async (req, res) => {
  const genericCategory = await genericCategoryService.getGenericCategoryById(req.params.genericCategoryId);
  if (!genericCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found, please check the Id.');
  }
  res.send(genericCategory);
});

const getGenericCategoriesByUserId = catchAsync(async (req, res) => {
  const genericCategory = await genericCategoryService.getGenericCategoriesByUserId(req.params.userId);
  if (!genericCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found, please check the User Id.');
  }
  res.send(genericCategory);
});

const updateGenericCategory = catchAsync(async (req, res) => {
  const genericCategory = await genericCategoryService.updateGenericCategoryById(req.params.genericCategoryId, req.body);
  res.send(genericCategory);
});

const deleteGenericCategory = catchAsync(async (req, res) => {
  await genericCategoryService.deleteGenericCategoryById(req.params.genericCategoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGenericCategory,
  getGenericCategoriesByUserId,
  getGenericCategory,
  updateGenericCategory,
  deleteGenericCategory,
};
