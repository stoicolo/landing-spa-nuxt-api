const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const menuValidation = require('../../validations/menu.validation');
const menuController = require('../../controllers/menu.controller');

const router = express.Router();

router.route('/').post(auth(), validate(menuValidation.createMenu), menuController.createMenu);

router
  .route('/menu/')
  .post(auth(), validate(menuValidation.getMenu), menuController.getMenu)
  .patch(auth(), validate(menuValidation.updateMenu), menuController.updateMenu)
  .delete(auth(), validate(menuValidation.deleteMenu), menuController.deleteMenu);

router
  .route('/menu-page/')
  .post(auth(), validate(menuValidation.createMenuPage), menuController.createMenuPage)
  .patch(auth(), validate(menuValidation.updateMenuPage), menuController.updateMenuPage)
  .delete(auth(), validate(menuValidation.deleteMenuPage), menuController.deleteMenuPage);

router.route('/get-menu-pages/').post(auth(), validate(menuValidation.getMenuPage), menuController.getMenuPage);

router
  .route('/menu-pages-bulk/')
  .post(auth(), validate(menuValidation.createMenuPagesBulk), menuController.createMenuPagesBulk)
  .patch(auth(), validate(menuValidation.updateMenuPagesBulk), menuController.updateMenuPagesBulk);

router
  .route('/get-menu-with-details/')
  .post(auth(), validate(menuValidation.getMenuWithDetails), menuController.getMenuWithDetails);

router
  .route('/create-menu-with-details')
  .post(auth(), validate(menuValidation.createMenuWithDetails), menuController.createMenuWithDetails);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management and retrieval
 */

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create a Menu
 *     description: Any registered user can create other menu.
 *     tags: [Menu  s]
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

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Get a menu
 *     description: Logged in Menu  can fetch only their own menu  information. Only admins can fetch other Menu .
 *     tags: [Menu  s]
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
 *     summary: Update a menu
 *     description: Logged in Menu  can only update their own information. Only admins can update other Menu .
 *     tags: [Menu  s]
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
 *     summary: Delete a menu
 *     description: Logged in Menu  can delete only themselves. Only admins can delete other Menu .
 *     tags: [Menu  s]
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
