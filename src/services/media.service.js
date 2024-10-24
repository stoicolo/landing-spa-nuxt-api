const httpStatus = require('http-status');
const { Op, cast, literal } = require('sequelize');
const { uploadImage, deleteImage } = require('./idrive.service');
const { Media } = require('../models');
const ApiError = require('../utils/ApiError');

const uploadSingleImage = async (req, res) => {
  try {
    // Log inicial
    console.log('Starting upload process');
    console.log('Request body:', req.body);
    
    const { file } = req;
    
    if (!file) {
      console.log('No file provided');
      return res.status(400).json({ message: 'a file is required' });
    }

    console.log('File details:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    // Upload image
    console.log('Uploading image...');
    const result = await uploadImage(file, 'images', req.body.websiteId);
    console.log('Upload result:', result);

    // Validate required fields
    if (!req.body.websiteId || !req.body.userId) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        message: 'websiteId and userId are required',
        receivedData: { websiteId: req.body.websiteId, userId: req.body.userId }
      });
    }

    // Prepare data for database
    const menuBody = {
      websiteId: parseInt(req.body.websiteId),  // Asegurar que sea número
      userId: parseInt(req.body.userId),        // Asegurar que sea número
      imageExternalUrl: result.url,
      imageExternalId: result.id,
    };

    console.log('Attempting to save to database with data:', menuBody);

    // Save to database
    const bdResult = await Media.create(menuBody);
    console.log('Database save result:', bdResult);

    // Send success response
    return res.status(200).json({ 
      message: 'image uploaded!', 
      data: bdResult 
    });

  } catch (error) {
    // Log error details
    console.error('Error in uploadSingleImage:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    // Send error response
    return res.status(500).json({ 
      message: 'Error processing image upload', 
      error: error.message 
    });
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
      [Op.or]: [{ websiteId }, { websiteId: 1 }],
    },
  });
};

const getImagesURLsByCategories = async (categories) => {
  return Media.findAll({
    where: {
      categories: {
        [Op.overlap]: cast(literal(`ARRAY[${categories.map((cat) => `'${cat}'`).join(',')}]`), 'text[]'),
      },
    },
  });
};

/**
 * Get Media by id
 * @param {Object} menuBody
 * @returns {Promise<MenuDetail>}
 */
const getMediaById = async (id) => {
  return Media.findOne({
    where: {
      id,
    },
  });
};

const updateImage = async (mediaId, updateBody) => {
  const media = await getMediaById(mediaId);

  if (!media) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Media not found, please check the id.');
  }
  Object.assign(media, updateBody);
  await media.save();
  return media;
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
        // eslint-disable-next-line no-console
        console.error(`Failed to delete image ${image.imageExternalId}:`, error);
        return { id: image.imageExternalId, success: false, error: error.message };
      }
    })
  );

  const successfulDeletes = results.filter((result) => result.success);
  const failedDeletes = results.filter((result) => !result.success);

  if (failedDeletes.length > 0) {
    // eslint-disable-next-line no-console
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
  getImagesURLsByCategories,
  updateImage,
  deleteImages,
};
