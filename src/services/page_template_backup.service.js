const httpStatus = require('http-status');
const { PageTemplateBackup } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for Page Template Backups
 * @param {userId} userId
 * @returns {Promise<PageTemplateBackup>}
 */
const getPageTemplateBackupsByName = async (backupName, userId) => {
  return PageTemplateBackup.findOne({
    where: {
      backupName,
      userId,
    },
  });
};

/**
 * Create a Page Template Backup
 * @param {Object} pageTemplateBackupBody
 * @returns {Promise<PageTemplateBackup>}
 */
const createPageTemplateBackup = async (pageTemplateBackupBody) => {
  try {
    const pageTemplateBackup = await getPageTemplateBackupsByName(
      pageTemplateBackupBody.backupName,
      pageTemplateBackupBody.userId
    );

    if (pageTemplateBackup) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'El nombre del Page Template Backup ya existe, prueba con otro nombre.');
    }

    return PageTemplateBackup.create(pageTemplateBackupBody);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Get Page Template Backup by id
 * @param {ObjectId} id
 * @returns {Promise<PageTemplateBackup>}
 */
const getPageTemplateBackupById = async (id) => {
  return PageTemplateBackup.findByPk(id);
};

/**
 * Query for Page Template Backups
 * @param {userId} userId
 * @returns {Promise<PageTemplateBackup>}
 */
const getPageTemplateBackupsByUserId = async (userId) => {
  return PageTemplateBackup.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update Page Template Backup by id
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
 * Delete Page Template Backup by id
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
