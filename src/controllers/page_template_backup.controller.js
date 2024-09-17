const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pageTemplateBackupService } = require('../services');

const createPageTemplateBackup = catchAsync(async (req, res) => {
  const pageTemplateBackup = await pageTemplateBackupService.createPageTemplateBackup(req.body);
  res.status(httpStatus.CREATED).send(pageTemplateBackup);
});

// const getPageTemplateBackups = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await pageTemplateBackupService.getPageTemplateBackups(filter, options);
//   res.send(result);
// });

const getPageTemplateBackup = catchAsync(async (req, res) => {
  const pageTemplateBackup = await pageTemplateBackupService.getPageTemplateBackupById(req.body.pageTemplateBackupId);
  if (!pageTemplateBackup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id.');
  }
  res.send(pageTemplateBackup);
});

const getPageTemplateBackupsByUserId = catchAsync(async (req, res) => {
  const pageTemplateBackup = await pageTemplateBackupService.getPageTemplateBackupsByUserId(req.body.userId);
  if (!pageTemplateBackup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(pageTemplateBackup);
});

const getPageTemplateBackupsByName = catchAsync(async (req, res) => {
  const pageTemplateBackup = await pageTemplateBackupService.getPageTemplateBackupsByName(
    req.body.backupName,
    req.body.userId
  );
  if (!pageTemplateBackup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(pageTemplateBackup);
});

const getTemplatesByCategories = catchAsync(async (req, res) => {
  const { categories } = req.query;
  const images = await pageTemplateBackupService.getTemplatesByCategories(categories);

  if (!images || images.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Images not found for the specified categories');
  }

  res.status(httpStatus.OK).send(images);
});

const updatePageTemplateBackup = catchAsync(async (req, res) => {
  const pageTemplateBackup = await pageTemplateBackupService.updatePageTemplateBackupById(
    req.body.pageTemplateBackupId,
    req.body
  );
  res.send(pageTemplateBackup);
});

const deletePageTemplateBackup = catchAsync(async (req, res) => {
  await pageTemplateBackupService.deletePageTemplateBackupById(req.body.pageTemplateBackupId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPageTemplateBackup,
  getPageTemplateBackupsByUserId,
  getPageTemplateBackupsByName,
  getPageTemplateBackup,
  getTemplatesByCategories,
  updatePageTemplateBackup,
  deletePageTemplateBackup,
};
