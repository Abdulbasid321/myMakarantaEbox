// src/controllers/quiz.controller.js
const quizService = require('../services/quiz.service');
const mongoose = require('mongoose');


// exports.createQuiz = async (req, res) => {
//     try {
//         const quiz = await quizService.createQuiz(req.body);
//         res.status(201).json({ message: 'Quiz created successfully', data: quiz });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

exports.createQuiz = async (req, res) => {
    try {
      const result = await quizService.createQuiz(req.body);
      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };
  

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await quizService.getAllQuizzes();
        res.status(200).json({ data: quizzes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuizById = async (req, res) => {
    try {
        const quiz = await quizService.getQuizById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json({ data: quiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// exports.submitQuiz = async (req, res) => {
//     try {
//       const { subjectId, answers } = req.body; // array of { questionId, selectedAnswer }
  
//       if (!subjectId || !answers || !Array.isArray(answers)) {
//         return res.status(400).json({ error: "subjectId and answers array are required" });
//       }
  
//       const result = await quizService.gradeQuiz(subjectId, answers);
//       return res.status(200).json(result);
//     } catch (err) {
//       return res.status(500).json({ error: err.message });
//     }
//   };

exports.submitQuiz = async (req, res) => {
    try {
      const { subjectId, answers } = req.body;
  
      if (!subjectId || !answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: "subjectId and answers array are required" });
      }
  
      // Ensure the subjectId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({ error: "Invalid subjectId format" });
      }
  
      const result = await quizService.gradeQuiz(subjectId, answers);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  