const { sequelize } = require('./sequelize');

function generateMigrations() {
  const { models } = sequelize;

  Object.values(models).forEach(async (model) => {
    const modelName = model.name;

    await sequelize.getQueryInterface().createTable(modelName, {
      id: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true,
      },
      ...model.tableAttributes, // adding custome attributes if necessary
      createdAt: {
        type: 'DATE',
        allowNull: false,
      },
      updatedAt: {
        type: 'DATE',
        allowNull: false,
      },
      ...model.indexes, // adding custome attributes if necessary
    });
  });
}

module.exports = generateMigrations;
