const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const articleCategoryValidation = require('../../validations/article_category.validation');
const articleCategoryController = require('../../controllers/article_category.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageArticleCategories'),
    validate(articleCategoryValidation.createArticleCategory),
    articleCategoryController.createArticleCategory
  )
  .get(
    auth('manageArticleCategories'),
    validate(articleCategoryValidation.getArticleCategories),
    articleCategoryController.getArticleCategories
  );

router
  .route('/user/:userId')
  .get(
    auth(),
    validate(articleCategoryValidation.getArticleCategoriesByUserId),
    articleCategoryController.getArticleCategoriesByUserId
  );

router
  .route('/id/:internalId')
  .get(
    auth(),
    validate(articleCategoryValidation.getArticleCategoryByInternalId),
    articleCategoryController.getArticleCategoryByArticleCategoryInternalId
  );

router
  .route('/id/')
  .patch(
    auth('manageArticleCategories'),
    validate(articleCategoryValidation.updateArticleCategory),
    articleCategoryController.updateArticleCategory
  )
  .delete(
    auth('manageArticleCategories'),
    validate(articleCategoryValidation.deleteArticleCategory),
    articleCategoryController.deleteArticleCategory
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ArticleCategories
 *   description: ArticleCategory management and retrieval
 */

/**
 * @swagger
 * /v1/articleCategorys:
 *   post:
 *     summary: Create a legal agreement document
 *     description: Only admins can create legal agreement documents.
 *     tags: [ArticleCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleCategory'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ArticleCategory'
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
 *     tags: [ArticleCategories]
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
 *                     $ref: '#/components/schemas/ArticleCategory'
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
 * /v1/articleCategorys/{articleCategoryId}:
 *   get:
 *     summary: Get a legal agreement document by ID
 *     description: Only admins can retrieve a legal agreement document by ID.
 *     tags: [ArticleCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleCategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ArticleCategory ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ArticleCategory'
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
 *     tags: [ArticleCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleCategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ArticleCategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleCategory'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ArticleCategory'
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
 *     tags: [ArticleCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleCategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ArticleCategory ID
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
