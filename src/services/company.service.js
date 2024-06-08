const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a company
 * @param {Object} companyBody
 * @returns {Promise<Company>}
 */
const createCompany = async (companyBody) => {
  if (await Company.isEmailTaken(companyBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ese Email ya esta en uso, prueba con otro.');
  }
  return Company.create(companyBody);
};

/**
 * Query for companys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCompanies = async (filter, options) => {
  const companys = await Company.paginate(filter, options);
  return companys;
};

/**
 * Get company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompanyById = async (id) => {
  return Company.findByPk(id);
};

/**
 * Get company by email
 * @param {string} email
 * @returns {Promise<Company>}
 */
const getCompanyByEmail = async (email) => {
  return Company.findOne({ where: { email } });
};

/**
 * Update company by id
 * @param {ObjectId} companyId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateCompanyById = async (companyId, updateBody) => {
  const company = await getCompanyById(companyId);

  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Compañia no encontrada, verifica el id.');
  }
  if (updateBody.email && (await Company.isEmailTaken(updateBody.email, companyId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ese email ya esta en uso, prueba con otro.');
  }
  Object.assign(company, updateBody);
  await company.save();
  return company;
};

/**
 * Delete company by id
 * @param {ObjectId} companyId
 * @returns {Promise<Company>}
 */
const deleteCompanyById = async (companyId) => {
  const company = await getCompanyById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Compañia no encontrada, verifica el id.');
  }
  await company.destroy();
  return company;
};

module.exports = {
  createCompany,
  queryCompanies,
  getCompanyById,
  getCompanyByEmail,
  updateCompanyById,
  deleteCompanyById,
};
