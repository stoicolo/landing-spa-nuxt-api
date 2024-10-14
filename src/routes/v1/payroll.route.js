const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const payrollValidation = require('../../validations/payroll.validation');
const payrollController = require('../../controllers/payroll.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('managePayrolls'), validate(payrollValidation.createPayroll), payrollController.createPayroll)
  .get(auth('managePayrolls'), validate(payrollValidation.getPayrolls), payrollController.getPayrolls);

router
  .route('/user/:userId')
  .get(auth(), validate(payrollValidation.getPayrollsByUserId), payrollController.getPayrollsByAgentId);

router
  .route('/id/:internalId')
  .get(auth(), validate(payrollValidation.getPayrollByInternalId), payrollController.getPayrollByPayrollInternalId);

router
  .route('/id/')
  .patch(auth('managePayrolls'), validate(payrollValidation.updatePayroll), payrollController.updatePayroll)
  .delete(auth('managePayrolls'), validate(payrollValidation.deletePayroll), payrollController.deletePayroll);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Payrolls
 *   description: Payroll management and retrieval
 */

/**
 * @swagger
 * /v1/payrolls:
 *   post:
 *     summary: Create a payroll document
 *     description: Only admins can create payroll documents.
 *     tags: [Payrolls]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payroll'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payroll'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all payroll documents
 *     description: Only admins can retrieve all payroll documents.
 *     tags: [Payrolls]
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
 *         description: Maximum number of payroll documents
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
 *                     $ref: '#/components/schemas/Payroll'
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
 * /v1/payrolls/{payrollId}:
 *   get:
 *     summary: Get a payroll document by ID
 *     description: Only admins can retrieve a payroll document by ID.
 *     tags: [Payrolls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payrollId
 *         required: true
 *         schema:
 *           type: string
 *         description: Payroll ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payroll'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a payroll document
 *     description: Only admins can update a payroll document.
 *     tags: [Payrolls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payrollId
 *         required: true
 *         schema:
 *           type: string
 *         description: Payroll ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payroll'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payroll'
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
 *     summary: Delete a payroll document
 *     description: Only admins can delete a payroll document.
 *     tags: [Payrolls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payrollId
 *         required: true
 *         schema:
 *           type: string
 *         description: Payroll ID
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
