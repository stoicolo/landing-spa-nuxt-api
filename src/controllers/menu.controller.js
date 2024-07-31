const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { menuService } = require('../services');

const createMenu = catchAsync(async (req, res) => {
  const menu = await menuService.createMenu(req.body);
  res.status(httpStatus.CREATED).send(menu);
});

const getMenu = catchAsync(async (req, res) => {
  const menu = await menuService.getMenu(req.body);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menú no encontrado, verifica el Id.');
  }
  res.send(menu);
});

const updateMenu = catchAsync(async (req, res) => {
  const menu = await menuService.updateMenu(req.body);
  res.send(menu);
});

const deleteMenu = catchAsync(async (req, res) => {
  await menuService.deleteMenu(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const createMenuPage = catchAsync(async (req, res) => {
  const menu = await menuService.getMenuPageBySlug(req.body);
  res.status(httpStatus.CREATED).send(menu);
});

const createMenuPagesBulk = catchAsync(async (req, res) => {
  const menuPages = await menuService.createMenuPagesBulk(req.body);
  res.status(httpStatus.CREATED).send(menuPages);
});

const createMenuWithDetails = catchAsync(async (req, res) => {
  const menu = await menuService.createMenuWithDetails(req.body);
  res.status(httpStatus.CREATED).send(menu);
});

const getMenuWithDetails = catchAsync(async (req, res) => {
  const menu = await menuService.getMenuWithDetails(req.body);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menú no encontrado');
  }
  res.send(menu);
});

const getMenuPage = catchAsync(async (req, res) => {
  const menu = await menuService.getMenuPage(req.body);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sub Menú no encontrado, verifica el Id.');
  }
  res.send(menu);
});

const updateMenuPage = catchAsync(async (req, res) => {
  const menu = await menuService.updateMenuPage(req.body);
  res.send(menu);
});

const deleteMenuPage = catchAsync(async (req, res) => {
  await menuService.deleteMenuPage(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  createMenuPage,
  createMenuPagesBulk,
  createMenuWithDetails,
  getMenuWithDetails,
  getMenuPage,
  updateMenuPage,
  deleteMenuPage,
};
