const UserModel = require('./user.model');
const TokenModel = require('./token.model');
const CompanyModel = require('./company.model');

const WidgetModel = require('./widget.model');
const PageTemplateModel = require('./page_template.model');
const PageTemplateBackupModel = require('./page_template_backup.model');
const PageModel = require('./page.model');
const WebsiteModel = require('./website.model');
const MenuHeaderModel = require('./menu_header.model');
const MenuDetailModel = require('./menu_detail.model');

// referencia: ya no es necesario ya que es redundante. ahora se hace en el modelo de una forma más especifica.
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
  Website: WebsiteModel,
  MenuHeader: MenuHeaderModel,
  MenuDetail: MenuDetailModel,
};
