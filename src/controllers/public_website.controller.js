const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { publicWebsiteService, tokenService } = require('../services');

const getPublicWebsiteById = catchAsync(async (req, res) => {
  const page = await publicWebsiteService.getPublicWebsiteById(req.params.websiteId);

  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Website Id.');
  }
  res.send(page);
});

const getPublicWebsitesByWebsiteDomain = catchAsync(async (req, res) => {
  const page = await publicWebsiteService.getPublicWebsitesByWebsiteDomain(req.params.websiteDomain);

  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Domain utilizado.');
  }
  res.send(page);
});

const getPublicWebsitesByWebsiteSlug = catchAsync(async (req, res) => {
  const page = await publicWebsiteService.getPublicWebsitesByWebsiteSlug(req.params.websiteSlug);

  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Página Web no encontrada, verifica el Slug utilizado.');
  }

  const encryptedPage = await tokenService.generateAuthTokens(page, 'publicWebsite');

  if (!encryptedPage) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error al encriptar el website');
  }

  res.send(encryptedPage);
});

module.exports = {
  getPublicWebsiteById,
  getPublicWebsitesByWebsiteDomain,
  getPublicWebsitesByWebsiteSlug,
};
