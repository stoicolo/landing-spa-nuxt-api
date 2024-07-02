const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { websiteService } = require('../services');

const createWebsite = catchAsync(async (req, res) => {
  const website = await websiteService.createWebsite(req.body);
  res.status(httpStatus.CREATED).send(website);
});

const getWebsite = catchAsync(async (req, res) => {
  const website = await websiteService.getWebsiteById(req.params.websiteId);
  if (!website) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sitio Web no encontrada, verifica el Id.');
  }
  res.send(website);
});

const getWebsitesByUserId = catchAsync(async (req, res) => {
  const website = await websiteService.getWebsitesByUserId(req.params.userId);
  if (!website) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sitio Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(website);
});

const getWebsiteByName = catchAsync(async (req, res) => {
  const website = await websiteService.getWebsiteByName(req.params.websiteName);
  if (!website) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sitio Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(website);
});

const updateWebsite = catchAsync(async (req, res) => {
  const website = await websiteService.updateWebsiteById(req.params.websiteId, req.body);
  res.send(website);
});

const deleteWebsite = catchAsync(async (req, res) => {
  await websiteService.deleteWebsiteById(req.params.websiteId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWebsite,
  getWebsitesByUserId,
  getWebsiteByName,
  getWebsite,
  updateWebsite,
  deleteWebsite,
};
