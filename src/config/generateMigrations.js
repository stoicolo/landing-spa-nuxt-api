const { sequelize } = require('./sequelize');

function generateMigrations() {
  const { models } = sequelize;

  // important to sort the models to avoid foreign key constraint errors
  const modelsSorted = {
    User: models.User,
    Token: models.Token,
    Company: models.Company,
    Widget: models.Widget,
    PageTemplate: models.PageTemplate,
    PageTemplateBackup: models.PageTemplateBackup,
    Page: models.Page,
    Website: models.Website,
    PublishHistory: models.PublishHistory,
    PublicWebsite: models.PublicWebsite,
    MenuHeader: models.MenuHeader,
    MenuDetail: models.MenuDetail,
    Media: models.Media,
    GenericTemplate: models.GenericTemplate,
  };

  console.log('%csrc/config/generateMigrations.js:22 Models Sort', 'color: #007acc;', modelsSorted);

  Object.values(modelsSorted).forEach(async (model) => {
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
