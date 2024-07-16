const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pageService } = require('../services');

const createPublishHistory = catchAsync(async (req, res) => {
  const page = await pageService.createPublishHistory(req.body);
  res.status(httpStatus.CREATED).send(page);
});

const getPublishHistory = catchAsync(async (req, res) => {
  const page = await pageService.getPublishHistoryById(req.params.websiteId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id.');
  }
  res.send(page);
});

const getPublishHistoriesByUserId = catchAsync(async (req, res) => {
  const page = await pageService.getPublishHistoriesByUserId(req.params.userId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(page);
});

const updatePublishHistory = catchAsync(async (req, res) => {
  const page = await pageService.updatePublishHistoryById(req.params.websiteId, req.body);
  res.send(page);
});

const deletePublishHistory = catchAsync(async (req, res) => {
  await pageService.deletePublishHistoryById(req.params.websiteId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPublishHistory,
  getPublishHistoriesByUserId,
  getPublishHistory,
  updatePublishHistory,
  deletePublishHistory,
};
