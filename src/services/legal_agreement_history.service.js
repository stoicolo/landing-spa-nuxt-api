const httpStatus = require('http-status');
const { LegalAgreementHistory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Legal Agreement History
 * @param {Object} docBody
 * @returns {Promise<LegalAgreementHistory>}
 */
const createDocument = async (docBody) => {
  try {
    const legalAgreementHistory = await LegalAgreementHistory.create(docBody);
    return legalAgreementHistory;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get Legal Agreement History by docId
 * @param {ObjectId} docId
 * @returns {Promise<LegalAgreementHistory>}
 */
const getDocumentById = async (docId) => {
  return LegalAgreementHistory.findByPk(docId);
};

/**
 * Query for Legal Agreement Histories
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getDocuments = async (filter, options) => {
  const legalAgreements = await LegalAgreementHistory.paginate(filter, options);
  return legalAgreements;
};

/**
 * Get Legal Agreement by User id
 * @param {ObjectId} userId
 * @returns {Promise<LegalAgreementHistory>}
 */
const getDocumentsByUserId = async (userId) => {
  return LegalAgreementHistory.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update Legal Agreement History by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<LegalAgreementHistory>}
 */
const updateDocument = async (id, updateBody) => {
  const legalAgreementHistory = await getDocumentById(id);

  if (!legalAgreementHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Documento no encontrado, verifica el id.');
  }

  const { registerUserId, description, releaseDate, registrationDate, ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(legalAgreementHistory, updateBodyWithoutColumnsNotEditable);

  await legalAgreementHistory.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return legalAgreementHistory;
};

/**
 * Delete Legal Agreement History by id
 * @param {ObjectId} docId
 * @returns {Promise<LegalAgreementHistory>}
 */
const deleteDocument = async (docId) => {
  const legalAgreementHistory = await getDocumentById(docId);

  if (!legalAgreementHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document no encontrado, verifica el id.');
  }
  await legalAgreementHistory.destroy();
  return legalAgreementHistory;
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentsByUserId,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
