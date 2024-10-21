const httpStatus = require('http-status');
const { Coupon } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a coupon
 * @param {Object} couponBody
 * @returns {Promise<Coupon>}
 */
const createCoupon = async (couponBody) => {
  try {
    const coupon = await Coupon.create(couponBody);
    return coupon;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get Coupon by couponInternalId
 * @param {ObjectId} couponInternalId
 * @returns {Promise<Coupon>}
 */
const getCouponByInternalId = async (couponInternalId) => {
  return Coupon.findOne({
    where: {
      internalId: couponInternalId,
    },
  });
};

/**
 * Get Coupon by couponInternalId
 * @param {ObjectId} couponExternalId
 * @returns {Promise<Coupon>}
 */
const getCouponByExternalId = async (couponExternalId) => {
  return Coupon.findOne({
    where: {
      externalCouponId: couponExternalId,
    },
  });
};

/**
 * Query for Coupons
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getCoupons = async (filter, options) => {
  const coupons = await Coupon.paginate(filter, options);
  return coupons;
};

/**
 * Update coupon by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Coupon>}
 */
const updateCoupon = async (id, updateBody) => {
  const coupon = await getCouponByInternalId(id);

  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el id.');
  }

  const { ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(coupon, updateBodyWithoutColumnsNotEditable);

  await coupon.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return coupon;
};

/**
 * Delete coupon by id
 * @param {ObjectId} couponInternalId
 * @returns {Promise<Coupon>}
 */
const deleteCoupon = async (couponInternalId) => {
  const coupon = await getCouponByInternalId(couponInternalId);

  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el id.');
  }
  await coupon.destroy();
  return coupon;
};

/**
 * Get last legal agreement by type
 * @param {string} type
 * @returns {Promise<Coupon>}
 */
const getLastCouponByType = async (type) => {
  return Coupon.findOne({
    where: {
      type,
    },
    order: [['id', 'DESC']],
    limit: 1,
  });
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponByInternalId,
  updateCoupon,
  deleteCoupon,
  getLastCouponByType,
  getCouponByExternalId,
};
