const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database
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
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *               - status
 *     responses:
 *       201:
 *         description: Successfully created user
 *       400:
 *         description: Bad request
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetch all users from the database
 *     responses:
 *       200:
 *         description: List of all users
 *       400:
 *         description: Error fetching users
 */
router.get("/", userController.getUsers); // Get all users

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Fetch a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user details
 *       404:
 *         description: User not found
 */
router.get("/:id", userController.getUserById); // Get user by ID

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     description: Update a user's details. The password will only be updated if explicitly provided.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
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
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - role
 *               - status
 *     responses:
 *       200:
 *         description: Successfully updated user
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.put("/:id", userController.updateUser); // Update user

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user from the database by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", userController.deleteUser); // Delete user

module.exports = router;
