const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const publishHistoryValidation = require('../../validations/publish_history.validation');
const publishHistoryController = require('../../controllers/publish_history.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(publishHistoryValidation.createPublishHistory), publishHistoryController.createPublishHistory)
  .get(auth(), validate(publishHistoryValidation.getPublishHistoryById), publishHistoryController.getPublishHistoryById);

router
  .route('/website/')
  .post(
    auth(),
    validate(publishHistoryValidation.getPublishHistoriesByWebsiteId),
    publishHistoryController.getPublishHistoriesByWebsiteId
  )
  .patch(auth(), validate(publishHistoryValidation.updatePublishHistory), publishHistoryController.updatePublishHistory)
  .delete(auth(), validate(publishHistoryValidation.deletePublishHistory), publishHistoryController.deletePublishHistory);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: PublishHistories
 *   description: PublishHistory management and retrieval
 */

/**
 * @swagger
 * /publishHistorys:
 *   post:
 *     summary: Create a publishHistory
 *     description: Any registered user can create other publishHistory  .
 *     tags: [PublishHistories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NA
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all publishHistory
 *     description: Only admins can retrieve all publishHistory  .
 *     tags: [PublishHistories]
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
 *         description: Maximum number of publishHistory
 *       - in: query
 *         name: publishHistory
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: PublishHistory number
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
 *                 publishHistory:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPublishHistories:
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

/**
 * @swagger
 * /publishHistorys/{id}:
 *   get:
 *     summary: Get a publishHistory template backup
 *     description: Logged in publishHistory   can fetch only their own publishHistory template backup information. Only admins can fetch other publishHistory  .
 *     tags: [PublishHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a publishHistory template backup
 *     description: Logged in publishHistory   can only update their own information. Only admins can update other publishHistory  .
 *     tags: [PublishHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a publishHistory template backup
 *     description: Logged in publishHistory   can delete only themselves. Only admins can delete other publishHistory  .
 *     tags: [PublishHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
