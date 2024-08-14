const { PublicWebsite } = require('../models');

/**
 * Get Public Website by id
 * @param {ObjectId} id
 * @returns {Promise<PublicWebsite>}
 */
const getPublicWebsiteById = async (id) => {
  return PublicWebsite.findByPk(id);
};

/**
 * Get Public Website by WebsiteId
 * @param {websiteId} websiteId
 * @returns {Promise<PublicWebsite>}
 */
const getPublicWebsitesByWebsiteSlug = async (websiteSlug) => {
  return PublicWebsite.findAll({
    where: {
      websiteSlug,
    },
  });
};

/**
 * Get Public Website by Website id
 * @param {websiteId} websiteId
 * @returns {Promise<PublicWebsite>}
 */
const getPublicWebsitesByWebsiteDomain = async (websiteDomain) => {
  return PublicWebsite.findAll({
    where: {
      websiteDomain,
    },
  });
};

module.exports = {
  getPublicWebsiteById,
  getPublicWebsitesByWebsiteSlug,
  getPublicWebsitesByWebsiteDomain,
};
