const Joi = require('joi');

const uploadImage = {
  body: Joi.object().keys({
    imageType: Joi.string()
      .valid('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/tiff', 'image/svg+xml')
      .required(),
    userId: Joi.number().required(),
    websiteId: Joi.number().required(),
  }),
  file: Joi.object({
    fieldname: Joi.string().valid('image').required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/tiff', 'image/svg+xml')
      .required(),
    buffer: Joi.binary().required(),
    size: Joi.number()
      .max(5 * 1024 * 1024)
      .required(), // 5MB max
  }).required(),
};

const getImages = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer().min(1),
    page: Joi.number().integer().min(1),
  }),
};

const getImagesURLsByWebsiteId = {
  body: Joi.object().keys({
    websiteId: Joi.number().required(),
  }),
};

const deleteImage = {
  params: Joi.object().keys({
    imageId: Joi.string().required(),
  }),
};

module.exports = {
  uploadImage,
  getImages,
  getImagesURLsByWebsiteId,
  deleteImage,
};
