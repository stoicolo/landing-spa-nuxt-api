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

const getImagesURLsByWebsiteId = {
  query: Joi.object().keys({
    websiteId: Joi.number().required(),
  }),
};

const deleteImages = {
  body: Joi.object().keys({
    imageIds: Joi.array().items(Joi.string()).min(1).required(),
  }),
};

module.exports = {
  uploadImage,
  getImagesURLsByWebsiteId,
  deleteImages,
};
