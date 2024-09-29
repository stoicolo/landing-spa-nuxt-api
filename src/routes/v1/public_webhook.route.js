const express = require('express');
const validate = require('../../middlewares/validate');
const publicWebhookValidation = require('../../validations/public_webhook.validation');
const publicWebhookController = require('../../controllers/public_webhook.controller');

const router = express.Router();

router
  .route('/tilopay/weblox/sucessful-subscription')
  .post(validate(publicWebhookValidation.successfulSubscription), publicWebhookController.successfulSubscription);
router
  .route('/tilopay/weblox/sucessful-payment')
  .post(validate(publicWebhookValidation.successfulPayment), publicWebhookController.successfulPayment);
router
  .route('/tilopay/weblox/failed-payment')
  .post(validate(publicWebhookValidation.failedPayment), publicWebhookController.failedPayment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: PublicWebsites
 *   description: PublicWebsite management and retrieval
 */

/**
 * @swagger
 * /publicWebhooks:
 *   post:
 *     summary: Create a publicWebhook
 *     description: Any registered user can create other publicWebhook  .
 *     tags: [PublicWebsites]
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
 *
 */
