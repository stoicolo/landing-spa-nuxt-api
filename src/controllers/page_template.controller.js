const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pageTemplateService } = require('../services');

const createPageTemplate = catchAsync(async (req, res) => {
  const pageTemplate = await pageTemplateService.createPageTemplate(req.body);
  res.status(httpStatus.CREATED).send(pageTemplate);
});

const getPageTemplate = catchAsync(async (req, res) => {
  const pageTemplate = await pageTemplateService.getPageTemplateById(req.params.pageTemplateId);
  if (!pageTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id.');
  }
  res.send(pageTemplate);
});

const getPageTemplatesByUserId = catchAsync(async (req, res) => {
  const pageTemplate = await pageTemplateService.getPageTemplatesByUserId(req.params.userId);
  if (!pageTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(pageTemplate);
});

const getTemplatesByCategories = catchAsync(async (req, res) => {
  const { categories } = req.query;
  const images = await pageTemplateService.getTemplatesByCategories(categories);

  if (!images || images.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Images not found for the specified categories');
  }

  res.status(httpStatus.OK).send(images);
});

const updatePageTemplate = catchAsync(async (req, res) => {
  const pageTemplate = await pageTemplateService.updatePageTemplateById(req.params.pageTemplateId, req.body);
  res.send(pageTemplate);
});

const deletePageTemplate = catchAsync(async (req, res) => {
  await pageTemplateService.deletePageTemplateById(req.params.pageTemplateId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPageTemplate,
  getPageTemplatesByUserId,
  getPageTemplate,
  getTemplatesByCategories,
  updatePageTemplate,
  deletePageTemplate,
};
