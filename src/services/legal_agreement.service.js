const httpStatus = require('http-status');
const { LegalAgreement } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a legalAgreement
 * @param {Object} docBody
 * @returns {Promise<LegalAgreement>}
 */
const createDocument = async (docBody) => {
  try {
    const legalAgreement = await LegalAgreement.create(docBody);
    return legalAgreement;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get LegalAgreement by docId
 * @param {ObjectId} docId
 * @returns {Promise<LegalAgreement>}
 */
const getDocumentById = async (docId) => {
  return LegalAgreement.findByPk(docId);
};

/**
 * Query for Legal Agreements
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getDocuments = async (filter, options) => {
  const legalAgreements = await LegalAgreement.paginate(filter, options);
  return legalAgreements;
};

/**
 * Get Legal Agreement by User id
 * @param {ObjectId} userId
 * @returns {Promise<LegalAgreement>}
 */
const getDocumentsByUserId = async (userId) => {
  return LegalAgreement.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update legalAgreement by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<LegalAgreement>}
 */
const updateDocument = async (id, updateBody) => {
  const legalAgreement = await getDocumentById(id);

  if (!legalAgreement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Documento no encontrado, verifica el id.');
  }

  const { registerUserId, description, releaseDate, registrationDate, ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(legalAgreement, updateBodyWithoutColumnsNotEditable);

  await legalAgreement.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return legalAgreement;
};

/**
 * Delete legalAgreement by id
 * @param {ObjectId} docId
 * @returns {Promise<LegalAgreement>}
 */
const deleteDocument = async (docId) => {
  const legalAgreement = await getDocumentById(docId);

  if (!legalAgreement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document no encontrado, verifica el id.');
  }
  await legalAgreement.destroy();
  return legalAgreement;
};

/**
 * Get last legal agreement by type
 * @param {string} type
 * @returns {Promise<LegalAgreement>}
 */
const getLastLegalAgreementByType = async (type) => {
  return LegalAgreement.findOne({
    where: {
      type,
    },
    order: [['createdAt', 'DESC']],
    limit: 1,
  });
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentsByUserId,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getLastLegalAgreementByType,
};
