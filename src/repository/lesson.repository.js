// const LessonModel = require('../model/Lesson.model');

// const createLesson = async (lessonData) => {
//     const Lesson = new LessonModel(lessonData);
//     await Lesson.save();
//     return Lesson;
// };


// const getAllLessons = async () => {
//     return await LessonModel.find();
// };

// const getLessonById = async (lessonId) => {
//     return await LessonModel.findById(lessonId);
// };

// const getLesson = async (query) => {
//     return await LessonModel.findOne(query);
// };

// const updateLessonById = async (lessonId, updateData, updateOptions) => {
//     return await LessonModel.findByIdAndUpdate(lessonId, updateData, updateOptions);
// };

// const updateLesson = async (query, updateData, updateOptions) => {
//     return await LessonModel.findOneAndUpdate (query, updateData, updateOptions);
// };

// module.exports = {
//     createLesson,
//     getLessonById,
//     getLesson,
//     updateLessonById,
//     updateLesson,
//     getAllLessons
// };


// const Lesson = require("../model/Lesson");

// exports.createLesson = async (lessonData) => {
//   return await Lesson.create(lessonData);
// };

// exports.getLessonsBySubject = async (subjectId) => {
//   return await Lesson.find({ subject: subjectId })
//     .sort({ lessonNumber: 1 }) // order by lessonNumber ascending
//     .populate("video pdf subject");
// };




// const lessonService = require('../services/lesson.service');

// exports.createLesson = async (req, res) => {
//   try {
//     const lesson = await lessonService.createLesson(req.body);
//     res.status(201).json(lesson);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getAllLessons = async (req, res) => {
//   try {
//     const lessons = await lessonService.getAllLessons();
//     res.status(200).json(lessons);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getLessonById = async (req, res) => {
//   try {
//     const lesson = await lessonService.getLessonById(req.params.id);
//     if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
//     res.status(200).json(lesson);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteLesson = async (req, res) => {
//   try {
//     const deleted = await lessonService.deleteLesson(req.params.id);
//     if (!deleted) return res.status(404).json({ error: 'Lesson not found' });
//     res.status(200).json({ message: 'Lesson deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const Lesson = require('../model/Lesson.model');

exports.createLesson = async (data) => {
  return await Lesson.create(data);
};

exports.getAllLessons = async () => {
  return await Lesson.find()
    .populate('subject')
    .populate('pdf')
    .populate('video');
};

exports.getLessonById = async (id) => {
  return await Lesson.findById(id)
    // .populate('subject')
    // .populate('pdf')
    // .populate('video');
    // // return await Lesson.findById(id)
  .populate('subject')
  .populate('pdf')
  .populate('video')
  .lean();
  return await Lesson.findById(id)

};

exports.deleteLesson = async (id) => {
  return await Lesson.findByIdAndDelete(id);
};

