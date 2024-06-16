const httpStatus = require('http-status');
const { PageTemplateBackup } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a pageTemplateBackup
 * @param {Object} pageTemplateBackupBody
 * @returns {Promise<PageTemplateBackup>}
 */
const createPageTemplateBackup = async (pageTemplateBackupBody) => {
  // if (await PageTemplateBackup.isCompanyPageTemplateBackupTaken(pageTemplateBackupBody.companyId)) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'La Página Web ya tiene un Page Template Backup previamente asignado, prueba con otra Página Web.'
  //   );
  // }

  return PageTemplateBackup.create(pageTemplateBackupBody);
};

/**
 * Get pageTemplateBackup by id
 * @param {ObjectId} id
 * @returns {Promise<PageTemplateBackup>}
 */
const getPageTemplateBackupById = async (id) => {
  return PageTemplateBackup.findByPk(id);
};

/**
 * Query for pageTemplateBackups
 * @param {userId} userId
 * @returns {Promise<PageTemplateBackup>}
 */
const getPageTemplateBackupsByUserId = async (userId) => {
  return PageTemplateBackup.findByPk(userId);
};

/**
 * Query for pageTemplateBackups
 * @param {userId} userId
 * @returns {Promise<PageTemplateBackup>}
 */
const getPageTemplateBackupsByName = async (templateName) => {
  return PageTemplateBackup.findOne({
    where: {
      templateName,
    },
  });
};

/**
 * Update pageTemplateBackup by id
 * @param {ObjectId} pageTemplateBackupId
 * @param {Object} updateBody
 * @returns {Promise<PageTemplateBackup>}
 */
const updatePageTemplateBackupById = async (pageTemplateBackupId, updateBody) => {
  const pageTemplateBackup = await getPageTemplateBackupById(pageTemplateBackupId);

  if (!pageTemplateBackup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  Object.assign(pageTemplateBackup, updateBody);
  await pageTemplateBackup.save();
  return pageTemplateBackup;
};

/**
 * Delete pageTemplateBackup by id
 * @param {ObjectId} pageTemplateBackupId
 * @returns {Promise<PageTemplateBackup>}
 */
const deletePageTemplateBackupById = async (pageTemplateBackupId) => {
  const pageTemplateBackup = await getPageTemplateBackupById(pageTemplateBackupId);
  if (!pageTemplateBackup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el id.');
  }
  await pageTemplateBackup.destroy();
  return pageTemplateBackup;
};

module.exports = {
  createPageTemplateBackup,
  getPageTemplateBackupById,
  getPageTemplateBackupsByName,
  getPageTemplateBackupsByUserId,
  updatePageTemplateBackupById,
  deletePageTemplateBackupById,
};
