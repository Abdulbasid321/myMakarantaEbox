const Class = require('../models/Class');

exports.createClass = async (data) => {
  return await Class.create(data);
};

exports.getAllClasses = async () => {
  return await Class.find().lean()
    .populate({
      path: 'subjects',
      populate: {
        path: 'lessons',
      }
    });
};

exports.getClassById = async (id) => {
  return await Class.findById(id).lean()
    .populate({
      path: 'subjects',
      populate: {
        path: 'lessons'
      }
    });
};

exports.deleteClass = async (id) => {
  return await Class.findByIdAndDelete(id);
};
