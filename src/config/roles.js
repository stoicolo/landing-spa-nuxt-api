const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageCoupons'],
  fmac: [
    'getUsers',
    'manageUsers',
    'manageCoupons',
    'manageWebsites',
    'manageLegalAgreements',
    'manageLegalAgreementsHistories',
    'manageSubscriptionHistories',
    'managePayrolls',
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
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
