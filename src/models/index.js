const UserModel = require('./user.model');
const TokenModel = require('./token.model');
const CompanyModel = require('./company.model');
const WidgetModel = require('./widget.model');
const PageTemplateModel = require('./page_template.model');
const PageTemplateBackupModel = require('./page_template_backup.model');
const PageModel = require('./page.model');
const WebsiteModel = require('./website.model');
const PublishHistoryModel = require('./publish_history.model');
const PublicWebsiteModel = require('./public_website.model');
const { MenuHeader, associateMenuHeader } = require('./menu_header.model');
const { MenuDetail, associateMenuDetail } = require('./menu_detail.model');
const MediaModel = require('./media.model');

const models = {
  User: UserModel,
  Token: TokenModel,
  Company: CompanyModel,
  Widget: WidgetModel,
  PageTemplate: PageTemplateModel,
  PageTemplateBackup: PageTemplateBackupModel,
  Website: WebsiteModel,
  Page: PageModel,
  PublishHistory: PublishHistoryModel,
  MenuHeader,
  MenuDetail,
  PublicWebsite: PublicWebsiteModel,
  Media: MediaModel,
};

associateMenuHeader(models);
associateMenuDetail(models);

module.exports = models;
