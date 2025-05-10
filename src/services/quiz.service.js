// src/services/quiz.service.js
const quizRepo = require('../repository/quiz.repository');
const mongoose = require('mongoose'); 

// const createQuiz = async (data) => {
//     if (!data.subject || !data.question || !data.options || !data.answer) {
//         throw new Error("All fields (subject, question, options, answer) are required");
//     }
//     return await quizRepo.createQuiz(data);
// };

const createQuiz = async (data) => {
  if (Array.isArray(data)) {
    for (const item of data) {
      if (
        !item.subject ||
        typeof item.question !== 'string' || item.question.trim() === '' ||
        !Array.isArray(item.options) || item.options.length === 0 ||
        typeof item.answer !== 'string' || item.answer.trim() === ''
      ) {
        throw new Error("Each quiz must have subject, question, options, and answer");
      }
    }
    return await quizRepo.createManyQuizzes(data); // use insertMany
  } else {
    if (
      !data.subject ||
      typeof data.question !== 'string' || data.question.trim() === '' ||
      !Array.isArray(data.options) || data.options.length === 0 ||
      typeof data.answer !== 'string' || data.answer.trim() === ''
    ) {
      throw new Error("All fields (subject, question, options, answer) are required");
    }
    return await quizRepo.createQuiz(data);
  }
};


const getAllQuizzes = async () => {
    return await quizRepo.getAllQuizs();
};

const getQuizById = async (id) => {
    return await quizRepo.getQuizById(id);
};

// const gradeQuiz = async (subjectId, userAnswers) => {
//   const questions = await quizRepo.getQuizzesBySubject({ subject: subjectId });

//   let score = 0;
//   const total = questions.length;
//   const results = [];

//   for (const question of questions) {
//     const userAnswer = userAnswers.find(ans => ans.questionId === question._id.toString());
//     const isCorrect = userAnswer && userAnswer.selectedAnswer === question.answer;

//     if (isCorrect) score++;

//     results.push({
//       question: question.question,
//       correctAnswer: question.answer,
//       userAnswer: userAnswer?.selectedAnswer || null,
//       isCorrect,
//     });
//   }

//   const percentage = (score / total) * 100;

//   return {
//     totalQuestions: total,
//     score,
//     percentage,
//     details: results,
//   };
// };

  const gradeQuiz = async (subjectId, userAnswers) => {
    // Pass the subjectId directly (ensure it's an ObjectId in the repo function)
    const questions = await quizRepo.getQuizzesBySubject(subjectId);

    let score = 0;
    const total = questions.length;
    const results = [];

    for (const question of questions) {
      // const userAnswer = userAnswers.find(ans => ans.questionId === question._id.toString());
      const userAnswer = userAnswers.find((ans) => ans.questionId == question._id.toString());

      const isCorrect = userAnswer && userAnswer.selectedAnswer === question.answer;

      if (isCorrect) score++;

      results.push({
        question: question.question,
        correctAnswer: question.answer,
        userAnswer: userAnswer?.selectedAnswer || null,
        isCorrect,
      });
    }

    const percentage = (score / total) * 100;

    return {
      totalQuestions: total,
      score,
      percentage,
      details: results,
    };
  };

module.exports = {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    gradeQuiz,
};
