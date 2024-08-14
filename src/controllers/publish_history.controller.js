const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { publishHistoryService } = require('../services');

const createPublishHistory = catchAsync(async (req, res) => {
  try {
    const page = await publishHistoryService.createPublishHistory(req.body);

    res.status(httpStatus.CREATED).send(page);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});

const getPublishHistoryById = catchAsync(async (req, res) => {
  const page = await publishHistoryService.getPublishHistoryById(req.body.publishHistoryId);

  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id.');
  }
  res.send(page);
});

const getPublishHistoriesByWebsiteId = catchAsync(async (req, res) => {
  const page = await publishHistoryService.getPublishHistoriesByWebsiteId(req.body.websiteId);

  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(page);
});

const getPublishHistoriesByUserId = catchAsync(async (req, res) => {
  const page = await publishHistoryService.getPublishHistoriesByUserId(req.params.userId);

  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(page);
});

const updatePublishHistory = catchAsync(async (req, res) => {
  const page = await publishHistoryService.updatePublishHistoryById(req.body.publishHistoryId, req.body);

  res.send(page);
});

const deletePublishHistory = catchAsync(async (req, res) => {
  await publishHistoryService.deletePublishHistoryById(req.body.publishHistoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPublishHistory,
  getPublishHistoriesByUserId,
  getPublishHistoriesByWebsiteId,
  getPublishHistoryById,
  updatePublishHistory,
  deletePublishHistory,
};
