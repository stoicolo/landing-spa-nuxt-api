const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const publicWebsiteValidation = require('../../validations/public_website.validation');
const publicWebsiteController = require('../../controllers/public_website.controller');

const router = express.Router();

router
  .route('/id/:websiteId')
  .get(
    auth('manageWebsites'),
    validate(publicWebsiteValidation.getPublicWebsiteById),
    publicWebsiteController.getPublicWebsiteById
  );
router
  .route('/domain/:websiteDomain')
  .get(validate(publicWebsiteValidation.getPublicWebsiteByDomain), publicWebsiteController.getPublicWebsitesByWebsiteDomain);
router
  .route('/slug/:websiteSlug')
  .get(
    auth('manageWebsites'),
    validate(publicWebsiteValidation.getPublicWebsiteBySlug),
    publicWebsiteController.getPublicWebsitesByWebsiteSlug
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: PublicWebsites
 *   description: PublicWebsite management and retrieval
 */

/**
 * @swagger
 * /publicWebsites:
 *   post:
 *     summary: Create a publicWebsite
 *     description: Any registered user can create other publicWebsite  .
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
 *   get:
 *     summary: Get all publicWebsite
 *     description: Only admins can retrieve all publicWebsite  .
 *     tags: [PublicWebsites]
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
 *         description: Maximum number of publicWebsite
 *       - in: query
 *         name: publicWebsite
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: PublicWebsite number
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
 *                 publicWebsite:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPublicWebsites:
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
 * /publicWebsites/{id}:
 *   get:
 *     summary: Get a publicWebsite template backup
 *     description: Logged in publicWebsite   can fetch only their own publicWebsite template backup information. Only admins can fetch other publicWebsite  .
 *     tags: [PublicWebsites]
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
 */
