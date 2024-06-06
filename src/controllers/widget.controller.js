const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { widgetService } = require('../services');

const createWidget = catchAsync(async (req, res) => {
  const widget = await widgetService.createWidget(req.body);
  res.status(httpStatus.CREATED).send(widget);
});

const getWidgets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await widgetService.getWidgets(filter, options);
  res.send(result);
});

const getWidget = catchAsync(async (req, res) => {
  const widget = await widgetService.getWidgetById(req.params.widgetId);
  if (!widget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Componente Web no encontrada, verifica el id.');
  }
  res.send(widget);
});

const updateWidget = catchAsync(async (req, res) => {
  const widget = await widgetService.updateWidgetById(req.params.widgetId, req.body);
  res.send(widget);
});

const deleteWidget = catchAsync(async (req, res) => {
  await widgetService.deleteWidgetById(req.params.widgetId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWidget,
  getWidgets,
  getWidget,
  updateWidget,
  deleteWidget,
};
