const httpStatus = require('http-status');
const { MenuHeader, MenuDetail } = require('../models');
const ApiError = require('../utils/ApiError');
const { sequelize } = require('../config/sequelize');

/**
 * Get Menu by id
 * @param {Object} menuBody
 * @returns {Promise<MenuHeader>}
 */
const getMenuById = async (menuBody) => {
  return MenuHeader.findOne({
    where: {
      userId: menuBody.userId,
      websiteId: menuBody.websiteId,
    },
  });
};

/**
 * Query for menus
 * @param {Object} menuBody
 * @returns {Promise<Array<MenuHeader>>}
 */
const getMenu = async (menuBody) => {
  return MenuHeader.findAll({
    where: {
      userId: menuBody.userId,
      websiteId: menuBody.websiteId,
    },
  });
};

/**
 * Create a menu
 * @param {Object} menuBody
 * @returns {Promise<MenuHeader>}
 */
const createMenu = async (menuBody) => {
  try {
    const menu = await getMenu(menuBody);

    if (menu && menu.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'El Website ya tiene un Menu asignado.');
    }

    return MenuHeader.create(menuBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Update menuHeader by id
 * @param {Object} menuBody
 * @returns {Promise<MenuHeader>}
 */
const updateMenu = async (menuBody) => {
  const menuHeader = await getMenuById(menuBody);

  if (!menuHeader) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  Object.assign(menuHeader, menuBody);

  await menuHeader.save();
  return menuHeader;
};

/**
 * Delete menuHeader by id
 * @param {Object} menuBody
 * @returns {Promise<MenuHeader>}
 */
const deleteMenu = async (menuBody) => {
  const menuHeader = await getMenuById(menuBody);
  if (!menuHeader) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  await menuHeader.destroy();
  return menuHeader;
};

/**
 * Get MenuPage by id
 * @param {Object} menuBody
 * @returns {Promise<MenuDetail>}
 */
const getMenuPageById = async (menuBody) => {
  return MenuDetail.findOne({
    where: {
      id: menuBody.id,
      menuHeaderId: menuBody.menuHeaderId,
      pageId: menuBody.pageId,
    },
  });
};

/**
 * Query for menu pages
 * @param {Object} menuBody
 * @returns {Promise<Array<MenuDetail>>}
 */
const getMenuPage = async (menuBody) => {
  return MenuDetail.findAll({
    where: {
      menuHeaderId: menuBody.menuHeaderId,
    },
  });
};

/**
 * Create a menu page
 * @param {Object} menuBody
 * @returns {Promise<MenuDetail>}
 */
const createMenuPage = async (menuBody) => {
  try {
    const menuPage = await getMenuPage(menuBody);

    if (menuPage && menuPage.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'El Website ya tiene un Menu asignado.');
    }

    return MenuDetail.create(menuBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Create menu pages in bulk
 * @param {Object} menuBody
 * @returns {Promise<Array<MenuDetail>>}
 */
const createMenuPagesBulk = async (menuBody) => {
  try {
    const { menuHeaderId, menuPages } = menuBody;

    const menuHeader = await MenuHeader.findByPk(menuHeaderId);
    if (!menuHeader) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Menu Header no encontrado.');
    }

    const createdMenuPages = await MenuDetail.bulkCreate(
      menuPages.map((page) => ({
        ...page,
        menuHeaderId,
      }))
    );

    return createdMenuPages;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Create a menu with details
 * @param {Object} menuBody
 * @returns {Promise<Object>}
 */
const createMenuWithDetails = async (menuBody) => {
  const { userId, websiteId, menuDetails } = menuBody;

  const t = await sequelize.transaction();

  try {
    const existingMenu = await MenuHeader.findOne({
      where: { userId, websiteId },
      transaction: t,
    });

    if (existingMenu) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'El Website ya tiene un Menu asignado.');
    }

    const menuHeader = await MenuHeader.create({ userId, websiteId }, { transaction: t });

    let createdMenuDetails = [];
    if (menuDetails && menuDetails.length > 0) {
      const menuDetailsWithHeaderId = menuDetails.map((detail) => ({
        ...detail,
        menuHeaderId: menuHeader.id,
      }));

      createdMenuDetails = await MenuDetail.bulkCreate(menuDetailsWithHeaderId, {
        transaction: t,
        validate: true,
      });
    }

    await t.commit();

    return {
      ...menuHeader.toJSON(),
      menuDetails: createdMenuDetails,
    };
  } catch (error) {
    await t.rollback();
    throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'Error al crear el menú con detalles');
  }
};

/**
 * Get menu with details
 * @param {Object} menuBody
 * @returns {Promise<MenuHeader>}
 */
const getMenuWithDetails = async (menuBody) => {
  const { userId, websiteId } = menuBody;

  const menu = await MenuHeader.findOne({
    where: {
      userId,
      websiteId,
    },
    include: [
      {
        model: MenuDetail,
        as: 'menuDetails',
      },
    ],
  });

  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menú no encontrado');
  }

  return menu;
};

/**
 * Update menuPage by id
 * @param {Object} menuBody
 * @returns {Promise<MenuDetail>}
 */
const updateMenuPage = async (menuBody) => {
  try {
    const menuPage = await getMenuPageById(menuBody);

    if (!menuPage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
    }

    const updatableFields = ['menuName', 'href', 'slug'];
    updatableFields.forEach((field) => {
      if (menuBody[field] !== undefined) {
        menuPage[field] = menuBody[field];
      }
    });

    await menuPage.save({ fields: updatableFields });

    await menuPage.reload();

    return menuPage;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'Error al actualizar el menú de la página.');
  }
};

/**
 * Delete menuPage by id
 * @param {Object} menuBody
 * @returns {Promise<MenuDetail>}
 */
const deleteMenuPage = async (menuBody) => {
  const menuPage = await getMenuPageById(menuBody);
  if (!menuPage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  await menuPage.destroy();
  return menuPage;
};

module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  getMenuPage,
  createMenuPage,
  createMenuPagesBulk,
  createMenuWithDetails,
  getMenuWithDetails,
  updateMenuPage,
  deleteMenuPage,
};
