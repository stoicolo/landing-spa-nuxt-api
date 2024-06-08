const httpStatus = require('http-status');
const { Widget } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a widget
 * @param {Object} widgetBody
 * @returns {Promise<Widget>}
 */
const createWidget = async (widgetBody) => {
  // if (await Widget.isCompanyWidgetTaken(widgetBody.companyId)) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'La Página Web ya tiene un Widget previamente asignado, prueba con otra Página Web.'
  //   );
  // }

  return Widget.create(widgetBody);
};

/**
 * Get widgetI by id
 * @param {ObjectId} id
 * @returns {Promise<Widget>}
 */
const getWidgetById = async (id) => {
  return Widget.findByPk(id);
};

/**
 * Query for widgets
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getWidgets = async (filter, options) => {
  const { limit, offset } = options;
  const widgets = await Widget.findAll({
    where: filter,
    limit,
    offset,
  });
  return widgets;
};

/**
 * Get widget by email
 * @param {string} email
 * @returns {Promise<Widget>}
 */
const getWidgetByEmail = async (email) => {
  return Widget.findOne({ where: { email } });
};

/**
 * Update widget by id
 * @param {ObjectId} widgetId
 * @param {Object} updateBody
 * @returns {Promise<Widget>}
 */
const updateWidgetById = async (widgetId, updateBody) => {
  const widget = await getWidgetById(widgetId);

  if (!widget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Componente Web no encontrada, verifica el id.');
  }
  Object.assign(widget, updateBody);
  await widget.save();
  return widget;
};

/**
 * Delete widget by id
 * @param {ObjectId} widgetId
 * @returns {Promise<Widget>}
 */
const deleteWidgetById = async (widgetId) => {
  const widget = await getWidgetById(widgetId);
  if (!widget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Componente Web no encontrada, verifica el id.');
  }
  await widget.destroy();
  return widget;
};

module.exports = {
  createWidget,
  getWidgetById,
  getWidgets,
  getWidgetByEmail,
  updateWidgetById,
  deleteWidgetById,
};
