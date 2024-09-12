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

const getImagesURLsByWebsiteId = catchAsync(async (req, res) => {
  const websiteId = req.query.websiteId;

  if (!websiteId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'websiteId is requiered');
  }

  const numericWebsiteId = Number(websiteId);

  if (isNaN(numericWebsiteId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'websiteId should be a number');
  }

  const images = await mediaService.getImagesURLsByWebsiteId(numericWebsiteId);

  if (!images || images.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Images not found, veryfy the websiteId');
  }

  res.status(httpStatus.OK).send(images);
});

const deleteImages = catchAsync(async (req, res) => {
  await mediaService.deleteImages(req.body.imageIds);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  uploadImage,
  getImagesURLsByWebsiteId,
  deleteImages,
};
