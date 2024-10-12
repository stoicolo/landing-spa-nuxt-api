const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageCoupons'],
  fmac: ['getUsers', 'manageUsers', 'manageCoupons', 'manageWebsites'],
  jp: ['getUsers', 'manageUsers', 'manageCoupons', 'manageWebsites'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
