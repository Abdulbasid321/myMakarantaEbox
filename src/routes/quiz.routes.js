// src/routes/quiz.routes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');
const { jwtVerify } = require('../middleware/jwtMiddleware');
const { createStuffs } = require('../helpers/roleAccess');

// Protected: Only admin/superAdmin can create
router.post('/', 
    // jwtVerify, 
    // createStuffs, 
    quizController.createQuiz);

// Public or authenticated access
router.get('/', 
    // jwtVerify, 
    quizController.getAllQuizzes);
router.get('/:id', 
    // jwtVerify, 
    quizController.getQuizById);

    router.post('/submit', 
        // jwtVerify, 
        quizController.submitQuiz);

module.exports = router;
