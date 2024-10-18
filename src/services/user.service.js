const httpStatus = require('http-status');
const { User } = require('../models');
const subscriptionHistoryService = require('./subscription_history.service');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findByPk(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
  }
  await user.destroy();
  return user;
};

/**
 * Delete user by email
 * @param {ObjectId} userEmail
 * @returns {Promise<User>}
 */
const deleteUserByEmail = async (userEmail) => {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el email.');
  }
  await user.destroy();
  return user;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  try {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email no disponible, prueba con otro.');
    }
    const userResponse = await User.create(userBody);

    const newSubscriptionHistoryPayload = {
      externalCouponId: userBody.coupon || '26BMM3YH',
      newUserId: userResponse.id,
      newUserEmail: userBody.email,
      amountPaid: null, // tilopay will calculate this via webhook successful
      newSubscriptionNextPaymentDate: null, // tilopay will calculate this via webhook successful
      isNewUserSubscriptionActive: false, // tilopay will calculate this via webhook successful
    };

    const newSubscriptionHistory = await subscriptionHistoryService.createSubscriptionHistory(newSubscriptionHistoryPayload);

    if (!newSubscriptionHistory) {
      // TODO: Enviar correo a Softstoic porque el SubscriptionHistory no se crea

      deleteUserById(userResponse.id); // delete user if subscriptionHistory is not created

      throw new ApiError(httpStatus.BAD_REQUEST, 'Historial de Subscripción no encontrado, verifica el id.');
    }

    return userResponse;
  } catch (error) {
    // TODO: Enviar correo a Softstoic porque el User Register no se crea

    deleteUserByEmail(userBody.email); // delete user if subscriptionHistory is not created

    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Query for users
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
  }

  const { password, ...updateBodyWithoutPassword } = updateBody;

  Object.assign(user, updateBodyWithoutPassword);

  await user.save({ fields: Object.keys(updateBodyWithoutPassword) });

  return user;
};

/**
 * Update User isEmailVerified
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserToActivated = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
  }

  Object.assign(user, updateBody);

  delete user.dataValues.password;

  await user.save();

  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserToActivated,
  deleteUserById,
};
