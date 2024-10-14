const httpStatus = require('http-status');
const { Payroll } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a payroll
 * @param {Object} payrollBody
 * @returns {Promise<Payroll>}
 */
const createPayroll = async (payrollBody) => {
  try {
    const payroll = await Payroll.create(payrollBody);
    return payroll;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get Payroll by payrollInternalId
 * @param {ObjectId} payrollInternalId
 * @returns {Promise<Payroll>}
 */
const getPayrollByInternalId = async (payrollInternalId) => {
  return Payroll.findOne({
    where: {
      internalId: payrollInternalId,
    },
  });
};

/**
 * Query for Payrolls
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getPayrolls = async (filter, options) => {
  const payrolls = await Payroll.paginate(filter, options);
  return payrolls;
};

/**
 * Get Payroll by User id
 * @param {ObjectId} userId
 * @returns {Promise<Payroll>}
 */
const getPayrollsByAgentId = async (userId) => {
  return Payroll.findAll({
    where: {
      agentId: userId,
    },
  });
};

/**
 * Update payroll by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Payroll>}
 */
const updatePayroll = async (id, updateBody) => {
  const payroll = await getPayrollByInternalId(id);

  if (!payroll) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el id.');
  }

  const {
    internalId,
    agentId,
    agentType,
    percentageToPay,
    clientId,
    internalCouponId,
    amountToPay,
    ...updateBodyWithoutColumnsNotEditable
  } = updateBody;

  Object.assign(payroll, updateBodyWithoutColumnsNotEditable);

  await payroll.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return payroll;
};

/**
 * Delete payroll by id
 * @param {ObjectId} payrollInternalId
 * @returns {Promise<Payroll>}
 */
const deletePayroll = async (payrollInternalId) => {
  const payroll = await getPayrollByInternalId(payrollInternalId);

  if (!payroll) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el id.');
  }
  await payroll.destroy();
  return payroll;
};

module.exports = {
  createPayroll,
  getPayrolls,
  getPayrollsByAgentId,
  getPayrollByInternalId,
  updatePayroll,
  deletePayroll,
};
