const SubjectModel = require('../model/Subject'); 

exports.createSubject = async (subjectData) => {
  const subject = new SubjectModel(subjectData);
  return await subject.save();
};

exports.getAllSubjects = async () => {
  return await SubjectModel.find().select('-__v'); // Select everything except for the __v field
};

exports.getSubjectById = async (id) => {
  return await SubjectModel.findById(id);
};

exports.updateSubject = async (id, updatedData) => {
  return await SubjectModel.findByIdAndUpdate(id, updatedData, { new: true }); 
};

exports.deleteSubject = async (id) => {
  return await SubjectModel.findByIdAndDelete(id);
};
