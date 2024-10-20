const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
  TRIAL_DAYS: 'trialDays',
  PUBLIC_WEBSITE: 'publicWebsite',
};

const tokenTypeList = [
  tokenTypes.ACCESS,
  tokenTypes.REFRESH,
  tokenTypes.RESET_PASSWORD,
  tokenTypes.VERIFY_EMAIL,
  tokenTypes.TRIAL_DAYS,
  tokenTypes.PUBLIC_WEBSITE,
];

module.exports = {
  tokenTypes,
  tokenTypeList,
};
