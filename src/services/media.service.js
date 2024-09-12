const httpStatus = require('http-status');
const { uploadImage, deleteImage } = require('./idrive.service');
const { Media } = require('../models');
const ApiError = require('../utils/ApiError');

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

const deleteImages = async (imageIds) => {
  const images = await Media.findAll({
    where: {
      imageExternalId: imageIds,
    },
  });

  if (images.length !== imageIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'One or more images not found');
  }

  const results = await Promise.all(
    images.map(async (image) => {
      try {
        await deleteImage(image.imageExternalId);
        await image.destroy();
        return { id: image.imageExternalId, success: true };
      } catch (error) {
        console.error(`Failed to delete image ${image.imageExternalId}:`, error);
        return { id: image.imageExternalId, success: false, error: error.message };
      }
    })
  );

  const successfulDeletes = results.filter((result) => result.success);
  const failedDeletes = results.filter((result) => !result.success);

  if (failedDeletes.length > 0) {
    console.warn('Some images failed to delete:', failedDeletes);
  }

  return {
    deletedCount: successfulDeletes.length,
    failedCount: failedDeletes.length,
    failedImages: failedDeletes.map((fail) => fail.id),
  };
};

module.exports = {
  uploadSingleImage,
  getImagesURLsByWebsiteId,
  deleteImages,
};
