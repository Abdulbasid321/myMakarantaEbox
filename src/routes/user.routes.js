const express = require('express');
const router = express.Router();
const { createStuffs } = require('../helpers/roleAccess');
const userController = require('../controllers/user.controller');
const { jwtVerify } = require('../middleware/jwtMiddleware');

// Route to get all users
router.get('/', jwtVerify, userController.getAllUsers);

// Route to get a user by ID
router.get('/:userId', jwtVerify, userController.getUser);

// Route to update a user by ID
router.put('/:userId', jwtVerify, userController.updateUser);

module.exports = router;