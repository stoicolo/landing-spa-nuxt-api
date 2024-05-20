const httpStatus = require('http-status');
const { Quiz } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a quiz
 * @param {Object} quizBody
 * @returns {Promise<Quiz>}
 */
const createQuiz = async (quizBody) => {
  if (await Quiz.isCompanyQuizTaken(quizBody.companyId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'La Compañia ya tiene un Quiz previamente completado, prueba con otra Compañia.'
    );
  }

  return Quiz.create(quizBody);
};

/**
 * Query for quizs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuizes = async (filter, options) => {
  const { limit, offset } = options;
  const quizes = await Quiz.findAll({
    where: filter,
    limit,
    offset,
  });
  return quizes;
};

/**
 * Get quiz by id
 * @param {ObjectId} id
 * @returns {Promise<Quiz>}
 */
const getQuizById = async (id) => {
  return Quiz.findByPk(id);
};

/**
 * Get quiz by email
 * @param {string} email
 * @returns {Promise<Quiz>}
 */
const getQuizByEmail = async (email) => {
  return Quiz.findOne({ email });
};

/**
 * Update quiz by id
 * @param {ObjectId} quizId
 * @param {Object} updateBody
 * @returns {Promise<Quiz>}
 */
const updateQuizById = async (quizId, updateBody) => {
  const quiz = await getQuizById(quizId);

  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Compañia no encontrada, verifica el id.');
  }
  if (updateBody.email && (await Quiz.isEmailTaken(updateBody.email, quizId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ese email ya esta en uso, prueba con otro.');
  }
  Object.assign(quiz, updateBody);
  await quiz.save();
  return quiz;
};

/**
 * Delete quiz by id
 * @param {ObjectId} quizId
 * @returns {Promise<Quiz>}
 */
const deleteQuizById = async (quizId) => {
  const quiz = await getQuizById(quizId);
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Compañia no encontrada, verifica el id.');
  }
  await quiz.destroy();
  return quiz;
};

module.exports = {
  createQuiz,
  queryQuizes,
  getQuizById,
  getQuizByEmail,
  updateQuizById,
  deleteQuizById,
};
