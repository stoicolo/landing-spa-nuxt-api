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
const docsRoute = require('./docs.route');
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
