
const Subject = require('../model/Subject.model');
const Lesson = require('../model/Lesson.model');

const createSubject = async (data) => {
  const subject = new Subject(data);
  return await subject.save();
};

const getAllSubjects = async () => {
  return await Subject.find().sort({ createdAt: -1 });
};

const getSubjectWithLessons = async (subjectId) => {
  const subject = await Subject.findById(subjectId);
  if (!subject) throw new Error('Subject not found');

  const lessons = await Lesson.find({ subject: subjectId })
    .populate('pdf')
    .populate('video')
    .sort({ order: 1 });

  return { subject, lessons };
};

const deleteSubject = async (subjectId) => {
  return await Subject.findByIdAndDelete(subjectId);
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectWithLessons,
  deleteSubject
};
