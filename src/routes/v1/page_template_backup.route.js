const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const pageTemplateBackupValidation = require('../../validations/page_template_backup.validation');
const pageTemplateBackupController = require('../../controllers/page_template_backup.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth(),
    validate(pageTemplateBackupValidation.createPageTemplateBackup),
    pageTemplateBackupController.createPageTemplateBackup
  );

router
  .route('/user/:userId')
  .get(
    auth(),
    validate(pageTemplateBackupValidation.getPageTemplateBackupsByUserId),
    pageTemplateBackupController.getPageTemplateBackupsByUserId
  );

router
  .route('/:pageTemplateBackupId')
  .get(
    auth(),
    validate(pageTemplateBackupValidation.getPageTemplateBackup),
    pageTemplateBackupController.getPageTemplateBackup
  )
  .patch(
    auth(),
    validate(pageTemplateBackupValidation.updatePageTemplateBackup),
    pageTemplateBackupController.updatePageTemplateBackup
  )
  .delete(
    auth(),
    validate(pageTemplateBackupValidation.deletePageTemplateBackup),
    pageTemplateBackupController.deletePageTemplateBackup
  );

router
  .route('/:templateName')
  .get(
    auth(),
    validate(pageTemplateBackupValidation.getPageTemplateBackupsByName),
    pageTemplateBackupController.getPageTemplateBackupsByName
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Page Templates Backup
 *   description: PageTemplateBackup management and retrieval
 */

/**
 * @swagger
 * /page_template_backups:
 *   post:
 *     summary: Create a page template backup
 *     description: Any registered user can create other page template backups.
 *     tags: [Page Templates Backup]
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
 *     summary: Get all page template backups
 *     description: Only admins can retrieve all page template backups.
 *     tags: [Page Templates Backup]
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
 *         description: Maximum number of page template backups
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
 *                     $ref: '#/components/schemas/User'
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
 */

/**
 * @swagger
 * /page_template_backups/{id}:
 *   get:
 *     summary: Get a page template backup
 *     description: Logged in page template backups can fetch only their own page template backup information. Only admins can fetch other page template backups.
 *     tags: [Page Templates Backup]
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
 *     summary: Update a page template backup
 *     description: Logged in page template backups can only update their own information. Only admins can update other page template backups.
 *     tags: [Page Templates Backup]
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
 *     summary: Delete a page template backup
 *     description: Logged in page template backups can delete only themselves. Only admins can delete other page template backups.
 *     tags: [Page Templates Backup]
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
