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
  ],
  jp: [
    'getUsers',
    'manageUsers',
    'manageCoupons',
    'manageWebsites',
    'manageLegalAgreements',
    'manageLegalAgreementsHistories',
    'manageSubscriptionHistories',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
