const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { genericTemplateService } = require('../services');

const createGenericTemplate = catchAsync(async (req, res) => {
  const genericTemplate = await genericTemplateService.createGenericTemplate(req.body);
  res.status(httpStatus.CREATED).send(genericTemplate);
});

const getGenericTemplate = catchAsync(async (req, res) => {
  const genericTemplate = await genericTemplateService.getGenericTemplateById(req.params.genericTemplateId);
  if (!genericTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Web page not found, please check the Id.');
  }
  res.send(genericTemplate);
});

const getGenericTemplatesByUserId = catchAsync(async (req, res) => {
  const genericTemplate = await genericTemplateService.getGenericTemplatesByUserId(req.params.userId);
  if (!genericTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Web page not found, please check the User Id.');
  }
  res.send(genericTemplate);
});

const updateGenericTemplate = catchAsync(async (req, res) => {
  const genericTemplate = await genericTemplateService.updateGenericTemplateById(req.params.genericTemplateId, req.body);
  res.send(genericTemplate);
});

const deleteGenericTemplate = catchAsync(async (req, res) => {
  await genericTemplateService.deleteGenericTemplateById(req.params.genericTemplateId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGenericTemplate,
  getGenericTemplatesByUserId,
  getGenericTemplate,
  updateGenericTemplate,
  deleteGenericTemplate,
};
