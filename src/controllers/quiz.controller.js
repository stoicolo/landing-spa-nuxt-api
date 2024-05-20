const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { quizService } = require('../services');

const createQuiz = catchAsync(async (req, res) => {
  const quiz = await quizService.createQuiz(req.body);
  res.status(httpStatus.CREATED).send(quiz);
});

const getQuizes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await quizService.queryQuizes(filter, options);
  res.send(result);
});

const getQuiz = catchAsync(async (req, res) => {
  const quiz = await quizService.getQuizById(req.params.quizId);
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Compañia no encontrada, verifica el id.');
  }
  res.send(quiz);
});

const updateQuiz = catchAsync(async (req, res) => {
  const quiz = await quizService.updateQuizById(req.params.quizId, req.body);
  res.send(quiz);
});

const deleteQuiz = catchAsync(async (req, res) => {
  await quizService.deleteQuizById(req.params.quizId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createQuiz,
  getQuizes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};
