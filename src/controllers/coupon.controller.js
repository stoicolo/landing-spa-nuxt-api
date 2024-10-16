const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { couponService } = require('../services');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createCoupon = catchAsync(async (req, res) => {
  try {
    const document = await couponService.createCoupon(req.body);

    res.status(httpStatus.CREATED).send(document);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
});

const getCoupons = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await couponService.getCoupons(filter, options);
  res.send(result);
});

const getCouponByCouponInternalId = catchAsync(async (req, res) => {
  const coupon = await couponService.getCouponByInternalId(req.params.internalId);

  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el id.');
  }
  res.send(coupon);
});

const updateCoupon = catchAsync(async (req, res) => {
  const coupon = await couponService.updateCoupon(req.body.internalId, req.body);

  res.send(coupon);
});

const deleteCoupon = catchAsync(async (req, res) => {
  await couponService.deleteCoupon(req.body.internalId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getCouponByType = catchAsync(async (req, res) => {
  const { type } = req.params;
  const coupon = await couponService.getLastCouponByType(type);

  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el tipo.');
  }
  res.send(coupon);
});

module.exports = {
  createCoupon,
  getCoupons,
  getCouponByCouponInternalId,
  updateCoupon,
  deleteCoupon,
  getCouponByType,
};
