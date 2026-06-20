const {Router} = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const authRouter = Router();

/**
 * @name Register User
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUser);

/**
 * @name Login User
 * @route POST /api/auth/login
 * @desc Login using existing email, password
 * @access Public
 */
authRouter.post('/login', authController.loginuser);

/**
 * @name Logout User
 * @route GET /api/auth/logout
 * @desc Logout user by blacklisting the token
 * @access Private
 */
authRouter.post('/logout', authController.logoutUser);

/**
 * @name Get User Profile
 * @route GET /api/auth/profile
 * @desc Get user profile information
 * @access Private
 */
authRouter.get('/profile', authMiddleware.authuser, authController.getUserProfile);




module.exports = authRouter;