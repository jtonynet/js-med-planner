const { Router } = require('express')
const AuthController = require('../controllers/authController')

const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive a Bearer token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "house@md.com"
 *               password:
 *                 type: string
 *                 example: "lupos"
 *     responses:
 *       200:
 *         description: Successful login, returns a Bearer token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "Bearer your_jwt_token_here"
 *       401:
 *         description: Unauthorized, invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/auth/login', AuthController.login)

module.exports = router
