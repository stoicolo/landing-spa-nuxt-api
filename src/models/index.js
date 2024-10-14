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
const GenericTemplateModel = require('./generic_template.model');
const GenericCategoryModel = require('./generic_category.model');
const PublicWebhookSubscriptionsModel = require('./public_webhook_subscriptions.model');
const PublicWebhookPaymentsModel = require('./public_webhook_payments.model');
const PublicWebhookPaymentFailedModel = require('./public_webhook_payment_failed.model');
const LegalAgreementModel = require('./legal_agreement.model');
const LegalAgreementHistoryModel = require('./legal_agreement_history.model');
const CouponModel = require('./coupon.model');
const SubscriptionHistoryModel = require('./subscription_history.model');
const PayrollModel = require('./payroll.model');

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
  GenericTemplate: GenericTemplateModel,
  GenericCategory: GenericCategoryModel,
  PublicWebhookSubscriptions: PublicWebhookSubscriptionsModel,
  PublicWebhookPayments: PublicWebhookPaymentsModel,
  PublicWebhookPaymentFailed: PublicWebhookPaymentFailedModel,
  LegalAgreement: LegalAgreementModel,
  LegalAgreementHistory: LegalAgreementHistoryModel,
  Coupon: CouponModel,
  SubscriptionHistory: SubscriptionHistoryModel,
  Payroll: PayrollModel,
};

associateMenuHeader(models);
associateMenuDetail(models);

module.exports = models;
