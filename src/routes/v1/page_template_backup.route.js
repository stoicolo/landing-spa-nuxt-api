const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const pageTemplateBackupValidation = require('../../validations/page_template_backup.validation');
const pageTemplateBackupController = require('../../controllers/page_template_backup.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Page Template Backups
 *   description: Page Template Backup management
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a page template backup
 *     tags: [PageTemplateBackups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PageTemplateBackup'
 *     responses:
 *       201:
 *         description: Page template backup created successfully
 *       400:
 *         description: Invalid input
 */
router
  .route('/')
  .post(
    auth(),
    validate(pageTemplateBackupValidation.createPageTemplateBackup),
    pageTemplateBackupController.createPageTemplateBackup
  );

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Get page template backups by user ID
 *     tags: [PageTemplateBackups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Page template backups retrieved successfully
 *       400:
 *         description: Invalid input
 */
router
  .route('/user/')
  .post(
    auth(),
    validate(pageTemplateBackupValidation.getPageTemplateBackupsByUserId),
    pageTemplateBackupController.getPageTemplateBackupsByUserId
  );

/**
 * @swagger
 * /id:
 *   post:
 *     summary: Get page template backup by ID
 *     tags: [PageTemplateBackups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageTemplateBackupId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Page template backup retrieved successfully
 *       400:
 *         description: Invalid input
 *   patch:
 *     summary: Update a page template backup
 *     tags: [PageTemplateBackups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageTemplateBackupId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Page template backup updated successfully
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a page template backup
 *     tags: [PageTemplateBackups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the page template backup to delete
 *     responses:
 *       204:
 *         description: Page template backup deleted successfully
 *       400:
 *         description: Invalid input
 */
router
  .route('/id/')
  .post(
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

/**
 * @swagger
 * /name:
 *   post:
 *     summary: Get page template backups by name
 *     tags: [PageTemplateBackups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               backupName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Page template backups retrieved successfully
 *       400:
 *         description: Invalid input
 */
router
  .route('/name/')
  .post(
    auth(),
    validate(pageTemplateBackupValidation.getPageTemplateBackupsByName),
    pageTemplateBackupController.getPageTemplateBackupsByName
  );

module.exports = router;
