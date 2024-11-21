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
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
