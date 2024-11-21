const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const articleBrandValidation = require('../../validations/article_brand.validation');
const articleBrandController = require('../../controllers/article_brand.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageArticleBrands'),
    validate(articleBrandValidation.createArticleBrand),
    articleBrandController.createArticleBrand
  )
  .get(
    auth('manageArticleBrands'),
    validate(articleBrandValidation.getArticleBrands),
    articleBrandController.getArticleBrands
  );

router
  .route('/user/:userId')
  .get(auth(), validate(articleBrandValidation.getArticleBrandsByUserId), articleBrandController.getArticleBrandsByUserId);

router
  .route('/id/:internalId')
  .get(
    auth(),
    validate(articleBrandValidation.getArticleBrandByInternalId),
    articleBrandController.getArticleBrandByArticleBrandInternalId
  );

router
  .route('/id/')
  .patch(
    auth('manageArticleBrands'),
    validate(articleBrandValidation.updateArticleBrand),
    articleBrandController.updateArticleBrand
  )
  .delete(
    auth('manageArticleBrands'),
    validate(articleBrandValidation.deleteArticleBrand),
    articleBrandController.deleteArticleBrand
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ArticleBrands
 *   description: ArticleBrand management and retrieval
 */

/**
 * @swagger
 * /v1/articleBrands:
 *   post:
 *     summary: Create a legal agreement document
 *     description: Only admins can create legal agreement documents.
 *     tags: [ArticleBrands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleBrand'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ArticleBrand'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all legal agreement documents
 *     description: Only admins can retrieve all legal agreement documents.
 *     tags: [ArticleBrands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Maximum number of legal agreement documents
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *                     $ref: '#/components/schemas/ArticleBrand'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 * /v1/articleBrands/{articleBrandId}:
 *   get:
 *     summary: Get a legal agreement document by ID
 *     description: Only admins can retrieve a legal agreement document by ID.
 *     tags: [ArticleBrands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleBrandId
 *         required: true
 *         schema:
 *           type: string
 *         description: ArticleBrand ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ArticleBrand'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a legal agreement document
 *     description: Only admins can update a legal agreement document.
 *     tags: [ArticleBrands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleBrandId
 *         required: true
 *         schema:
 *           type: string
 *         description: ArticleBrand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleBrand'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ArticleBrand'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a legal agreement document
 *     description: Only admins can delete a legal agreement document.
 *     tags: [ArticleBrands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleBrandId
 *         required: true
 *         schema:
 *           type: string
 *         description: ArticleBrand ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
