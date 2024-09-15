const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const companyRoute = require('./company.route');
const pageTemplateRoute = require('./page_template.route');
const pageTemplateBackupRoute = require('./page_template_backup.route');
const widgetRoute = require('./widget.route');
const pageRoute = require('./page.route');
const websiteRoute = require('./website.route');
const menuRoute = require('./menu.route');
const publishHistoryRoute = require('./publish_history.route');
const publicWebsiteRoute = require('./public_website.route');
const docsRoute = require('./docs.route');
const mediaRoute = require('./media.route');
const genericTemplateRoute = require('./generic_template.route');
const genericCategoryRoute = require('./generic_category.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/companies',
    route: companyRoute,
  },
  {
    path: '/page_templates',
    route: pageTemplateRoute,
  },
  {
    path: '/page_template_backups',
    route: pageTemplateBackupRoute,
  },
  {
    path: '/pages',
    route: pageRoute,
  },
  {
    path: '/widgets',
    route: widgetRoute,
  },
  {
    path: '/websites',
    route: websiteRoute,
  },
  {
    path: '/menus',
    route: menuRoute,
  },
  {
    path: '/publish_histories',
    route: publishHistoryRoute,
  },
  {
    path: '/public_websites',
    route: publicWebsiteRoute,
  },
  {
    path: '/media',
    route: mediaRoute,
  },
  {
    path: '/generic_templates',
    route: genericTemplateRoute,
  },
  {
    path: '/generic_categories',
    route: genericCategoryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
