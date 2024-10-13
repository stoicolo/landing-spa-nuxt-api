const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subscriptionHistoryValidation = require('../../validations/subscription_history.validation');
const subscriptionHistoryController = require('../../controllers/subscription_history.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageSubscriptionHistories'),
    validate(subscriptionHistoryValidation.createSubscriptionHistory),
    subscriptionHistoryController.createSubscriptionHistory
  )
  .get(
    auth('manageSubscriptionHistories'),
    validate(subscriptionHistoryValidation.getSubscriptionHistories),
    subscriptionHistoryController.getSubscriptionHistories
  );

router
  .route('/user/:userId')
  .get(
    auth(),
    validate(subscriptionHistoryValidation.getSubscriptionHistoriesByUserId),
    subscriptionHistoryController.getSubscriptionHistoriesByUserId
  );

router
  .route('/id/:internalId')
  .get(
    auth(),
    validate(subscriptionHistoryValidation.getSubscriptionHistoryByInternalId),
    subscriptionHistoryController.getSubscriptionHistoryBySubscriptionHistoryInternalId
  );

router
  .route('/id/')
  .patch(
    auth('manageSubscriptionHistories'),
    validate(subscriptionHistoryValidation.updateSubscriptionHistory),
    subscriptionHistoryController.updateSubscriptionHistory
  )
  .delete(
    auth('manageSubscriptionHistories'),
    validate(subscriptionHistoryValidation.deleteSubscriptionHistory),
    subscriptionHistoryController.deleteSubscriptionHistory
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SubscriptionHistories
 *   description: SubscriptionHistory management and retrieval
 */

/**
 * @swagger
 * /v1/subscriptionHistorys:
 *   post:
 *     summary: Create a subscription history document
 *     description: Only admins can create subscription history documents.
 *     tags: [SubscriptionHistories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionHistory'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubscriptionHistory'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all subscription history documents
 *     description: Only admins can retrieve all subscription history documents.
 *     tags: [SubscriptionHistories]
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
 *         description: Maximum number of subscription history documents
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
 *                     $ref: '#/components/schemas/SubscriptionHistory'
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
 * /v1/subscriptionHistorys/{subscriptionHistoryId}:
 *   get:
 *     summary: Get a subscription history document by ID
 *     description: Only admins can retrieve a subscription history document by ID.
 *     tags: [SubscriptionHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subscriptionHistoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: SubscriptionHistory ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubscriptionHistory'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a subscription history document
 *     description: Only admins can update a subscription history document.
 *     tags: [SubscriptionHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subscriptionHistoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: SubscriptionHistory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionHistory'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubscriptionHistory'
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
 *     summary: Delete a subscription history document
 *     description: Only admins can delete a subscription history document.
 *     tags: [SubscriptionHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subscriptionHistoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: SubscriptionHistory ID
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
