const httpStatus = require('http-status');
const { MenuHeader } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get menuHeader by id
 * @param {ObjectId} id
 * @returns {Promise<MenuHeader>}
 */
const getMenuHeaderById = async (id) => {
  return MenuHeader.findByPk(id);
};

/**
 * Query for pages
 * @param {userId} userId
 * @returns {Promise<MenuHeader>}
 */
const getMenusByUserId = async (userId) => {
  return MenuHeader.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update menuHeader by id
 * @param {ObjectId} pageId
 * @param {Object} updateBody
 * @returns {Promise<MenuHeader>}
 */
const updateMenuHeaderById = async (pageId, updateBody) => {
  const menuHeader = await getMenuHeaderById(pageId);

  if (!menuHeader) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  Object.assign(menuHeader, updateBody);
  await menuHeader.save();
  return menuHeader;
};

/**
 * Delete menuHeader by id
 * @param {ObjectId} pageId
 * @returns {Promise<MenuHeader>}
 */
const deleteMenuHeaderById = async (pageId) => {
  const menuHeader = await getMenuHeaderById(pageId);
  if (!menuHeader) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  await menuHeader.destroy();
  return menuHeader;
};

module.exports = {
  getMenuHeaderById,
  getMenusByUserId,
  updateMenuHeaderById,
  deleteMenuHeaderById,
};
