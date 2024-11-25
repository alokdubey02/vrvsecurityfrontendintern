const express = require('express');
const { login, logout } = require('../controllers/authController');

const router = express.Router();

// Swagger Setup
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *       required:
 *         - email
 *         - password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authenticated user
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: User's name
 *             email:
 *               type: string
 *               description: User's email
 *             role:
 *               type: string
 *               description: User's role
 *             status:
 *               type: string
 *               description: User's account status
 *             permissions:
 *               type: array
 *               items:
 *                 type: string
 *               description: List of user permissions
 */

// Login route
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns a JWT token
 *     description: This route allows users to log in using email and password, and returns a JWT token along with user information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post('/login', login);

// Logout route
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logs out the user
 *     description: This route logs out the user by invalidating their session or token on the client-side.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       500:
 *         description: Server error
 */
router.post('/logout', logout);

module.exports = router;
