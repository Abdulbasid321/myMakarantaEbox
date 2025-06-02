const QuizModel = require('../model/Quiz.model');
const mongoose = require('mongoose');


const createQuiz = async (quizData) => {
    const quiz = new QuizModel(quizData);
    await quiz.save();
    return quiz;
};

const createManyQuizzes = async (quizzes) => {
    return await QuizModel.insertMany(quizzes);
  };


const getAllQuizs = async () => {
    return await QuizModel.find().populate('subject');
};

const getQuizById = async (quizId) => {
    return await QuizModel.findById(quizId);
};

const getQuiz = async (query) => {
    return await QuizModel.findOne(query);
};

const updateQuizById = async (quizId, updateData, updateOptions) => {
    return await QuizModel.findByIdAndUpdate(quizId, updateData, updateOptions);
};

const updateQuiz = async (query, updateData, updateOptions) => {
    return await QuizModel.findOneAndUpdate (query, updateData, updateOptions);
};



const getQuizzesBySubject = async (subjectId) => {
    // Check if subjectId is valid
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      throw new Error("Invalid subject ID format");
    }
  
    // Query with the correct ObjectId format
    return await QuizModel.find({ subject: new mongoose.Types.ObjectId(subjectId) });
  };
  
  
module.exports = {
    createManyQuizzes,
    getQuizById,
    getQuiz,
    updateQuizById,
    updateQuiz,
    getAllQuizs,
    getQuizzesBySubject,

    createQuiz
};

