const LessonModel = require('../model/Lesson');

exports.createMedia = async (mediaData) => {
  const mediaItem = new LessonModel(mediaData);
  return await mediaItem.save();
};

exports.getAllMedia = async () => {
  return await LessonModel.find().select('-__v');
};

exports.findMediaByName = async (mediaName) => {
  return await LessonModel.findOne({ mediaName });
};

exports.findMediaById = async (id) => {
  return await LessonModel.findById(id);
};

exports.deleteMediaById = async (id) => {
  return await LessonModel.findByIdAndDelete(id);
};
