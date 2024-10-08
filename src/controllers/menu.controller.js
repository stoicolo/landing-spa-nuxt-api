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

const updateMenuPagesBulk = async (req, res) => {
  try {
    const result = await menuService.updateMenuPagesBulk(req.body);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor' });
    }
  }
};

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

const getPagesWithoutMenu = catchAsync(async (req, res) => {
  const menu = await menuService.getPagesWithoutMenu(req.body);
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

const deleteMenuPagesBulk = catchAsync(async (req, res) => {
  try {
    const result = await menuService.deleteMenuPagesBulk(req.body);

    res.status(httpStatus.OK).json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor' });
    }
  }
});

module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  createMenuPage,
  createMenuPagesBulk,
  updateMenuPagesBulk,
  createMenuWithDetails,
  getMenuWithDetails,
  getPagesWithoutMenu,
  getMenuPage,
  updateMenuPage,
  deleteMenuPage,
  deleteMenuPagesBulk,
};
