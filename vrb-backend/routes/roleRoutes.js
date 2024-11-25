const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     description: Create a new role with specified permissions (read, write, delete)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolename:
 *                 type: string
 *               permissions:
 *                 type: object
 *                 properties:
 *                   read:
 *                     type: boolean
 *                   write:
 *                     type: boolean
 *                   delete:
 *                     type: boolean
 *             required:
 *               - rolename
 *               - permissions
 *     responses:
 *       201:
 *         description: Successfully created role
 *       400:
 *         description: Bad request
 */
router.post('/', roleController.createRole);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     description: Fetch all roles from the database
 *     responses:
 *       200:
 *         description: List of all roles
 *       400:
 *         description: Error fetching roles
 */
router.get('/', roleController.getRoles);  // Get all roles

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     description: Fetch a role by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the role
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The role details
 *       404:
 *         description: Role not found
 */
router.get('/:id', roleController.getRoleById);  // Get role by ID

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update role information
 *     description: Update a role's details and permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the role
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolename:
 *                 type: string
 *               permissions:
 *                 type: object
 *                 properties:
 *                   read:
 *                     type: boolean
 *                   write:
 *                     type: boolean
 *                   delete:
 *                     type: boolean
 *             required:
 *               - rolename
 *               - permissions
 *     responses:
 *       200:
 *         description: Successfully updated role
 *       400:
 *         description: Bad request
 *       404:
 *         description: Role not found
 */
router.put('/:id', roleController.updateRole);  // Update role

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete role by ID
 *     description: Delete a role from the database by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the role
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role successfully deleted
 *       404:
 *         description: Role not found
 */
router.delete('/:id', roleController.deleteRole);  // Delete role

module.exports = router;