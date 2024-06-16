const UserModel = require('./user.model');
const TokenModel = require('./token.model');
const CompanyModel = require('./company.model');

const WidgetModel = require('./widget.model');
const PageTemplateModel = require('./page_template.model');
const PageTemplateBackupModel = require('./page_template_backup.model');
const PageModel = require('./page.model');

// no es necesario y es redundante, ya se hace en el modelo de una forma más especifica.
// UserModel.hasMany(TokenModel);
// TokenModel.belongsTo(UserModel);
// PageTemplateModel.belongsTo(CompanyModel);

module.exports = {
  User: UserModel,
  Token: TokenModel,
  Company: CompanyModel,
  Widget: WidgetModel,
  PageTemplate: PageTemplateModel,
  PageTemplateBackup: PageTemplateBackupModel,
  Page: PageModel,
};
