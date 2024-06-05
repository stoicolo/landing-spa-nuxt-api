const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pageTemplateService } = require('../services');

const createPageTemplate = catchAsync(async (req, res) => {
  const pageTemplate = await pageTemplateService.createPageTemplate(req.body);
  res.status(httpStatus.CREATED).send(pageTemplate);
});

const getPageTemplates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await pageTemplateService.getPageTemplates(filter, options);
  res.send(result);
});

const getPageTemplate = catchAsync(async (req, res) => {
  const pageTemplate = await pageTemplateService.getPageTemplateById(req.params.pageTemplateId);
  if (!pageTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  res.send(pageTemplate);
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
  getPageTemplates,
  getPageTemplate,
  updatePageTemplate,
  deletePageTemplate,
};
