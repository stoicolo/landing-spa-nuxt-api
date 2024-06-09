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
  const pageTemplateBackup = await pageTemplateBackupService.getPageTemplateBackupById(req.params.pageTemplateBackupId);
  if (!pageTemplateBackup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id.');
  }
  res.send(pageTemplateBackup);
});

const getPageTemplateBackupsByUserId = catchAsync(async (req, res) => {
  const pageTemplateBackup = await pageTemplateBackupService.getPageTemplateBackupsByUserId(req.params.userId);
  if (!pageTemplateBackup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Id de Usuario.');
  }
  res.send(pageTemplateBackup);
});

const updatePageTemplateBackup = catchAsync(async (req, res) => {
  const pageTemplateBackup = await pageTemplateBackupService.updatePageTemplateBackupById(
    req.params.pageTemplateBackupId,
    req.body
  );
  res.send(pageTemplateBackup);
});

const deletePageTemplateBackup = catchAsync(async (req, res) => {
  await pageTemplateBackupService.deletePageTemplateBackupById(req.params.pageTemplateBackupId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPageTemplateBackup,
  getPageTemplateBackupsByUserId,
  getPageTemplateBackup,
  updatePageTemplateBackup,
  deletePageTemplateBackup,
};
