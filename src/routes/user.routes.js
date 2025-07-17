const express = require('express');
const router = express.Router();
const { createStuffs } = require('../helpers/roleAccess');
const userController = require('../controllers/user.controller');
const { jwtVerify } = require('../middleware/jwtMiddleware');
const upload = require('../middleware/upload');
// Route to get all users


router.get('/', jwtVerify, userController.getAllUsers);

// Route to get a user by ID
router.get('/:userId', jwtVerify, userController.getUser);

// Route to update a user by ID
// router.put('/:userId', jwtVerify, userController.updateUser);
    router.put('/:userId', jwtVerify, upload.single("profilePic"), userController.updateUser);

// Route to update a 
// router.put('/change-password/:userId', jwtVerify, userController);

module.exports = router;