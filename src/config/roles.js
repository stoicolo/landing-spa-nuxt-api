const allRoles = {
  user: [],
  admin: ['getUsers', 'getCoupons'],
  fmac: [
    'getUsers',
    'manageUsers',
    'manageCoupons',
    'manageWebsites',
    'manageLegalAgreements',
    'manageLegalAgreementsHistories',
    'manageSubscriptionHistories',
    'managePayrolls',
    'manageAgents',
    'manageArticleCategories',
    'manageArticleBrands',
    'manageArticles',
  ],
  jpag: [
    'getUsers',
    'manageUsers',
    'manageCoupons',
    'manageWebsites',
    'manageLegalAgreements',
    'manageLegalAgreementsHistories',
    'manageSubscriptionHistories',
    'managePayrolls',
    'manageAgents',
    'manageArticleCategories',
    'manageArticleBrands',
    'manageArticles',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
