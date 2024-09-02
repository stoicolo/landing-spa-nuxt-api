const Joi = require('joi');

const uploadImage = {
  body: Joi.object().keys({
    imageType: Joi.string()
      .valid('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/tiff', 'image/svg+xml')
      .required(),
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

const deleteImage = {
  params: Joi.object().keys({
    imageId: Joi.string().required(),
  }),
};

module.exports = {
  uploadImage,
  deleteImage,
};
