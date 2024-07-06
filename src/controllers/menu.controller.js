const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { menuService } = require('../services');

const createMenu = catchAsync(async (req, res) => {
  const menu = await menuService.createMenu(req.body);
  res.status(httpStatus.CREATED).send(menu);
});

const getMenu = catchAsync(async (req, res) => {
  const menu = await menuService.getMenuById(req.body);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menú no encontrada, verifica el Id.');
  }
  res.send(menu);
});

const updateMenu = catchAsync(async (req, res) => {
  const menu = await menuService.updateMenuById(req.params.menuId, req.body);
  res.send(menu);
});

const deleteMenu = catchAsync(async (req, res) => {
  await menuService.deleteMenuById(req.params.menuId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
};
