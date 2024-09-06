const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mediaService } = require('../services');

const uploadImage = catchAsync(async (req, res) => {
  try {
    const result = await mediaService.uploadSingleImage(req, res);

    res.status(httpStatus.OK).json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor' });
    }
  }
});

const deleteImage = async (req, res) => {
  await mediaService.deleteImage(req.params.imageId);
  res.status(httpStatus.NO_CONTENT).send();
};

const getImages = async (req, res) => {
  const images = await mediaService.getImages();

  res.status(httpStatus.OK).send(images);
};

const getImagesURLsByWebsiteId = catchAsync(async (req, res) => {
  const images = await mediaService.getImagesURLsByWebsiteId(req.body.websiteId);

  if (!images) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Website no encontrado, verifica el Id de Usuario.');
  }
  res.send(images);
});

module.exports = {
  uploadImage,
  deleteImage,
  getImages,
  getImagesURLsByWebsiteId,
};
