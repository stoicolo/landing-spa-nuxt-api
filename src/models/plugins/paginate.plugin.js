/* eslint-disable no-param-reassign */

const paginate = () => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * //    * Query for documents with pagination
   * @param {Object} [filter] - filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  return (model) => {
    model.paginate = async function (filter, options) {
      const { page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;

      const totalCount = await this.count({ where: filter });
      const totalPages = Math.ceil(totalCount / limit);

      const results = await this.findAll({ where: filter, limit, offset });

      return {
        results,
        page,
        limit,
        totalPages,
        totalResults: totalCount,
      };
    };
  };
};

module.exports = paginate;
