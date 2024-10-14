const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { payrollService } = require('../services');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPayroll = catchAsync(async (req, res) => {
  try {
    const document = await payrollService.createPayroll(req.body);

    res.status(httpStatus.CREATED).send(document);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
});

const getPayrolls = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await payrollService.getPayrolls(filter, options);

  res.send(result);
});

const getPayrollsByAgentId = catchAsync(async (req, res) => {
  const payroll = await payrollService.getPayrollsByAgentId(req.params.userId);

  if (!payroll) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Planilla no encontrada, verifica el id.');
  }
  res.send(payroll);
});

const getPayrollByPayrollInternalId = catchAsync(async (req, res) => {
  const payroll = await payrollService.getPayrollByInternalId(req.params.internalId);

  if (!payroll) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Planilla no encontrada, verifica el id.');
  }
  res.send(payroll);
});

const updatePayroll = catchAsync(async (req, res) => {
  const payroll = await payrollService.updatePayroll(req.body.internalId, req.body);

  res.send(payroll);
});

const deletePayroll = catchAsync(async (req, res) => {
  await payrollService.deletePayroll(req.body.internalId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPayroll,
  getPayrolls,
  getPayrollsByAgentId,
  getPayrollByPayrollInternalId,
  updatePayroll,
  deletePayroll,
};
