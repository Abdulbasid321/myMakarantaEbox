const LessonModel = require('../model/Lesson.model');

const createLesson = async (lessonData) => {
    const Lesson = new LessonModel(lessonData);
    await Lesson.save();
    return Lesson;
};


const getAllLessons = async () => {
    return await LessonModel.find();
};

const getLessonById = async (lessonId) => {
    return await LessonModel.findById(lessonId);
};

const getLesson = async (query) => {
    return await LessonModel.findOne(query);
};

const updateLessonById = async (lessonId, updateData, updateOptions) => {
    return await LessonModel.findByIdAndUpdate(lessonId, updateData, updateOptions);
};

const updateLesson = async (query, updateData, updateOptions) => {
    return await LessonModel.findOneAndUpdate (query, updateData, updateOptions);
};

module.exports = {
    createLesson,
    getLessonById,
    getLesson,
    updateLessonById,
    updateLesson,
    getAllLessons
};