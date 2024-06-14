const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pageService } = require('../services');

const createPage = catchAsync(async (req, res) => {
  const page = await pageService.createPage(req.body);
  res.status(httpStatus.CREATED).send(page);
});

// const getPages = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await pageService.getPages(filter, options);
//   res.send(result);
// });

const getPage = catchAsync(async (req, res) => {
  const page = await pageService.getPageById(req.params.pageId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id.');
  }
  res.send(page);
});

const getPagesByUserId = catchAsync(async (req, res) => {
  const page = await pageService.getPagesByUserId(req.params.userId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(page);
});

const getPagesByName = catchAsync(async (req, res) => {
  const page = await pageService.getPagesByName(req.params.templateName);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(page);
});

const updatePage = catchAsync(async (req, res) => {
  const page = await pageService.updatePageById(req.params.pageId, req.body);
  res.send(page);
});

const deletePage = catchAsync(async (req, res) => {
  await pageService.deletePageById(req.params.pageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPage,
  getPagesByUserId,
  getPagesByName,
  getPage,
  updatePage,
  deletePage,
};
