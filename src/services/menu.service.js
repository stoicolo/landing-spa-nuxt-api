const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { MenuHeader, MenuDetail, Page } = require('../models');
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
 * Query for pages without menu assigned for a specific menuHeaderId
 * @param {Object} menuBody - Object containing menuHeaderId
 * @returns {Promise<Array<Page>>}
 */
const getPagesWithoutMenu = async (menuBody) => {
  const { menuHeaderId } = menuBody;

  const pagesWithMenu = await MenuDetail.findAll({
    attributes: ['pageId'],
    where: {
      menuHeaderId,
    },
    raw: true,
  });

  const pageIdsWithMenu = pagesWithMenu.map((item) => item.pageId);

  const pagesWithoutMenu = await Page.findAll({
    where: {
      id: {
        [Op.notIn]: pageIdsWithMenu,
      },
    },
  });

  return pagesWithoutMenu;
};

/**
 * Query for menu pages by slug
 * @param {Object} menuBody
 * @returns {Promise<Array<MenuDetail>>}
 */
const getMenuPageBySlug = async (menuBody) => {
  const { websiteId } = menuBody;

  try {
    const existingMenu = await MenuHeader.findOne({
      where: { websiteId },
    });

    if (!existingMenu) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'El Website NO tiene un Menu asignado.');
    }

    const existingMenuDetail = await MenuDetail.findAll({
      where: {
        menuHeaderId: menuBody.menuHeaderId,
        slug: menuBody.slug,
      },
    });

    if (!existingMenuDetail || existingMenuDetail.length === 0) {
      return MenuDetail.create(menuBody);
    }
    throw new ApiError(httpStatus.BAD_REQUEST, 'El Menú Slug ya está asignado a otro menú. Por favor, elija otro Slug.');
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'Error al crear el menú con detalles');
  }
};

/**
 * Create a menu page
 * @param {Object} menuBody
 * @returns {Promise<MenuDetail>}
 */
const createMenuPage = async (menuBody) => {
  try {
    const menuPage = await getMenuPageBySlug(menuBody);

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
 * Update menu pages in bulk
 * @param {Object} menuBody
 * @returns {Promise<Array<MenuDetail>>}
 */
const updateMenuPagesBulk = async (menuBody) => {
  const transaction = await sequelize.transaction();

  try {
    const { menuHeaderId, menuPages } = menuBody;

    const menuHeader = await MenuHeader.findByPk(menuHeaderId, { transaction });
    if (!menuHeader) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Menu Header no encontrado.');
    }

    const updatePromises = menuPages.map(async (page) => {
      try {
        const [updatedCount] = await MenuDetail.update(
          {
            menuName: page.menuName,
            href: page.href,
            slug: page.slug,
            iconName: page.iconName,
            order: page.order,
          },
          {
            where: {
              menuHeaderId,
              pageId: page.pageId,
            },
            transaction,
          }
        );

        if (updatedCount === 0) {
          console.warn(
            `No se actualizó ningún registro para MenuDetail con menuHeaderId ${menuHeaderId} y pageId ${page.pageId}`
          );
        }

        return updatedCount;
      } catch (updateError) {
        if (updateError.name === 'SequelizeUniqueConstraintError') {
          const field = updateError.errors[0].path;
          throw new ApiError(
            httpStatus.CONFLICT,
            `El valor "${updateError.errors[0].value}" ya existe para el campo ${field} en otro MenuDetail.`
          );
        }
        throw updateError;
      }
    });

    await Promise.all(updatePromises);

    const updatedMenuPages = await MenuDetail.findAll({
      where: {
        menuHeaderId,
        pageId: menuPages.map((page) => page.pageId),
      },
      transaction,
    });

    await transaction.commit();
    return updatedMenuPages;
  } catch (error) {
    await transaction.rollback();
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.BAD_REQUEST, `Error al actualizar MenuDetails: ${error.message}`);
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
        attributes: [
          'id',
          'menuHeaderId',
          'pageId',
          'menuName',
          'href',
          'slug',
          'iconName',
          'order',
          'createdAt',
          'updatedAt',
        ],
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

/**
 * Delete MenuDetailsPage in Bulk
 * @param {Object} menuBody
 * @returns {Promise<MenuDetail>}
 */
const deleteMenuPagesBulk = async (menuBody) => {
  const { websiteId, menuHeaderId, menuPagesIds } = menuBody;

  if (!websiteId || !menuHeaderId || !Array.isArray(menuPagesIds)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Parámetros inválidos.');
  }

  const transaction = await sequelize.transaction();
  try {
    const menuHeader = await MenuHeader.findOne({
      where: { id: menuHeaderId, websiteId },
      transaction,
    });
    if (!menuHeader) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Menu Header no encontrado.');
    }

    const deletedCount = await MenuDetail.destroy({
      where: {
        menuHeaderId,
        id: {
          [Op.in]: menuPagesIds,
        },
      },
      transaction,
    });

    if (deletedCount === 0) {
      console.warn(`No se eliminó ningún registro para MenuDetail con menuHeaderId ${menuHeaderId}`);
    }

    await transaction.commit();
    return deletedCount;
  } catch (error) {
    await transaction.rollback();
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.BAD_REQUEST, `Error al eliminar MenuDetails: ${error.message}`);
  }
};

module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  getMenuPage,
  getMenuPageBySlug,
  createMenuPage,
  createMenuPagesBulk,
  updateMenuPagesBulk,
  createMenuWithDetails,
  getMenuWithDetails,
  getPagesWithoutMenu,
  updateMenuPage,
  deleteMenuPage,
  deleteMenuPagesBulk,
};
