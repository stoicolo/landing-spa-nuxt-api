const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { uploadsService } = require('../services');

const uploadImage = catchAsync(async (req, res) => {
  try {
    const result = await uploadsService.uploadSingleImage(req, res);

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
  await uploadsService.deleteImage(req.params.imageId);
  res.status(httpStatus.NO_CONTENT).send();
};

const listImages = async (req, res) => {
  const images = await uploadsService.listImages();
  res.status(httpStatus.OK).send(images);
};

module.exports = {
  uploadImage,
  deleteImage,
  listImages,
};
