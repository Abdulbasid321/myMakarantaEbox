const express = require('express');
const router = express.Router();
const { createStuffs } = require('../helpers/roleAccess');
const authController = require('../controllers/auth.controller');
const { jwtVerify } = require('../middleware/jwtMiddleware');

// Route to create a new user
router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.post('/verifyEmail', authController.verifyEmail);

router.get('/forgot-password/:userEmail', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-code', authController.verifyCode);


module.exports = router;