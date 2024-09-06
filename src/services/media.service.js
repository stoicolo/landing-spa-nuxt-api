const { uploadImage } = require('./idrive.service');
const { Media } = require('../models');

const uploadSingleImage = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: 'a file is required' });
    }

    const result = await uploadImage(file, 'images', req.body.websiteId);

    try {
      const menuBody = {
        websiteId: req.body.websiteId,
        userId: req.body.userId,
        imageExternalUrl: result.url,
        imageExternalId: result.id,
      };
      await Media.create(menuBody);
    } catch (error) {
      res.json({ message: 'Error when saving images URLs', error: error.message });
    }

    res.json({ message: 'image uploaded!', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error when uploading image: ', error: error.message });
  }
};

/**
 * Get PublishHistory by Website id
 * @param {websiteId} websiteId
 * @returns {Promise<Media>}
 */
const getImagesURLsByWebsiteId = async (websiteId) => {
  return Media.findAll({
    where: {
      websiteId,
    },
  });
};

module.exports = {
  uploadSingleImage,
  getImagesURLsByWebsiteId,
};
