const QuizModel = require('../model/Quiz.model');

const createQuiz = async (quizData) => {
    const quiz = new QuizModel(quizData);
    await quiz.save();
    return quiz;
};


const getAllQuizs = async () => {
    return await QuizModel.find();
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

module.exports = {
    createQuiz,
    getQuizById,
    getQuiz,
    updateQuizById,
    updateQuiz,
    getAllQuizs
};