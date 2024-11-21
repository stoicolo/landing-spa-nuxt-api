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
    Website: models.Website,
    Page: models.Page,
    PageTemplateBackup: models.PageTemplateBackup,
    MenuHeader: models.MenuHeader,
    MenuDetail: models.MenuDetail,
    PublishHistory: models.PublishHistory,
    PublicWebsite: models.PublicWebsite,
    Media: models.Media,
    GenericTemplate: models.GenericTemplate,
    GenericCategory: models.GenericCategory,
    PublicWebhookSubscriptions: models.PublicWebhookSubscriptions,
    PublicWebhookPayments: models.PublicWebhookPayments,
    PublicWebhookPaymentFailed: models.PublicWebhookPaymentFailed,
    LegalAgreement: models.LegalAgreement,
    LegalAgreementHistory: models.LegalAgreementHistory,
    Coupon: models.Coupon,
    SubscriptionHistory: models.SubscriptionHistory,
    Payroll: models.Payroll,
    Agent: models.Agent,
    ArticleCategory: models.ArticleCategory,
    ArticleBrand: models.ArticleBrand,
    Article: models.Article,
  };

  const modelsArray = Object.values(modelsSorted);

  return modelsArray
    .reduce((promise, model) => {
      return promise.then(() => {
        const modelName = model.name;
        const tableDefinition = {
          id: {
            type: 'INTEGER',
            primaryKey: true,
            autoIncrement: true,
          },
          ...model.tableAttributes,
          createdAt: {
            type: 'DATE',
            allowNull: false,
          },
          updatedAt: {
            type: 'DATE',
            allowNull: false,
          },
          ...model.indexes,
        };

        return sequelize
          .getQueryInterface()
          .createTable(modelName, tableDefinition)
          .then(() => {
            // eslint-disable-next-line no-console
            console.log(`Table ${modelName} created successfully.`, true);
          });
      });
    }, Promise.resolve())
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error creating tables:', error);
    });
}

module.exports = generateMigrations;
