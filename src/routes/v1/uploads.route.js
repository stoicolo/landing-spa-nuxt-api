const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const uploadsValidation = require('../../validations/uploads.validation');
const uploadsController = require('../../controllers/uploads.controller');

const router = express.Router();

// Configuración de multer para almacenar archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

router
  .route('/images')
  .post(
    auth(),
    upload.single('image'), // Middleware de multer para manejar la carga de archivos
    validate(uploadsValidation.uploadImage),
    uploadsController.uploadImage
  )
  .get(auth(), uploadsController.listImages); // Cambiado a listImages, asumiendo que tiene esta función

router.route('/images/:imageId').delete(auth(), validate(uploadsValidation.deleteImage), uploadsController.deleteImage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Images management and retrieval
 */

/**
 * @swagger
 * /uploads/images:
 *
 *   get:
 *     summary: Get all Menu
 *     description: Only admins can retrieve all Menu .
 *     tags: [Menu  s]
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
 *         description: Maximum number of Menu
 *       - in: query
 *         name: menu
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Menu  number
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
 *                 menu:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalMenu:
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
