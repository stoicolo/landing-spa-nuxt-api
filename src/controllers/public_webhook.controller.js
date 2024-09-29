const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { publicWebhookService } = require('../services');

const successfulSubscription = catchAsync(async (req, res) => {
  try {
    const page = await publicWebhookService.successfulSubscription(req.body);

    res.status(httpStatus.CREATED).send(page);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});

const successfulPayment = catchAsync(async (req, res) => {
  try {
    const page = await publicWebhookService.successfulPayment(req.body);

    res.status(httpStatus.CREATED).send(page);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});

const failedPayment = catchAsync(async (req, res) => {
  try {
    const page = await publicWebhookService.failedPayment(req.body);

    res.status(httpStatus.CREATED).send(page);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});

module.exports = {
  successfulSubscription,
  successfulPayment,
  failedPayment,
};
