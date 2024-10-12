const addPagination = (model) => {
  model.paginate = async function (query = {}, { page = 1, pageSize = 10 }) {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await this.findAndCountAll({
      ...query,
      offset,
      limit: pageSize,
    });

    return {
      docs: rows,
      totalDocs: count,
      page,
      totalPages: Math.ceil(count / pageSize),
      hasNextPage: offset + rows.length < count,
      hasPrevPage: page > 1,
    };
  };
};

module.exports = { addPagination };

// Use case:
// const { addPagination } = require('../utils/paginationUtil');
//
// addPagination(YourModel);
