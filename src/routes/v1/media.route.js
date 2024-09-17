const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const mediaValidation = require('../../validations/media.validation');
const mediaController = require('../../controllers/media.controller');

const router = express.Router();

// Configuración de multer para almacenar archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

router
  .route('/images')
  .post(
    auth(),
    upload.single('image'), // Middleware de multer para manejar la carga de archivos
    validate(mediaValidation.uploadImage),
    mediaController.uploadImage
  )
  .get(auth(), validate(mediaValidation.getImagesURLsByWebsiteId), mediaController.getImagesURLsByWebsiteId)
  .patch(auth(), validate(mediaValidation.updateImage), mediaController.updateImage)
  .delete(auth(), validate(mediaValidation.deleteImages), mediaController.deleteImages);

router
  .route('/images-list')
  .get(auth(), validate(mediaValidation.getImagesURLsByCategories), mediaController.getImagesURLsByCategories);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Images management and retrieval
 */

/**
 * @swagger
 * /media/images:
 *
 *   get:
 *     summary: Get all Media
 *     description: Only admins can retrieve all Media .
 *     tags: [Media  s]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of Media
 *       - in: query
 *         name: media
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Media  number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 media:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalMedia:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
