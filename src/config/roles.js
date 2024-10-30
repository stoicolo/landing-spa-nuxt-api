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
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
