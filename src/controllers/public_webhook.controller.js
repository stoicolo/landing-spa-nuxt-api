const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { publicWebhookService } = require('../services');

const registerTransaction = catchAsync(async (req, res) => {
  try {
    const page = await publicWebhookService.registerTransaction(req.body);

    res.status(httpStatus.CREATED).send(page);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});

module.exports = {
  registerTransaction,
};
