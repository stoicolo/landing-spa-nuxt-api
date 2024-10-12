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
 * Get Coupon by couponId
 * @param {ObjectId} couponId
 * @returns {Promise<Coupon>}
 */
const getCouponById = async (couponId) => {
  return Coupon.findByPk(couponId);
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
 * Get Coupon by User id
 * @param {ObjectId} userId
 * @returns {Promise<Coupon>}
 */
const getCouponsByUserId = async (userId) => {
  return Coupon.findAll({
    where: {
      userId,
    },
  });
};

/**
 * Update coupon by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Coupon>}
 */
const updateCoupon = async (id, updateBody) => {
  const coupon = await getCouponById(id);

  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cupón no encontrado, verifica el id.');
  }

  const { registerUserId, description, releaseDate, registrationDate, ...updateBodyWithoutColumnsNotEditable } = updateBody;

  Object.assign(coupon, updateBodyWithoutColumnsNotEditable);

  await coupon.save({ fields: Object.keys(updateBodyWithoutColumnsNotEditable) });

  return coupon;
};

/**
 * Delete coupon by id
 * @param {ObjectId} couponId
 * @returns {Promise<Coupon>}
 */
const deleteCoupon = async (couponId) => {
  const coupon = await getCouponById(couponId);

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
    order: [['createdAt', 'DESC']],
    limit: 1,
  });
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponsByUserId,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  getLastCouponByType,
};
