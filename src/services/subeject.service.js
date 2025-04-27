const subjectRepository = require('../repository/subject.repository');

exports.createSubject = async (subjectData) => {
  return await subjectRepository.createSubject(subjectData);
};

exports.getAllSubjects = async () => {
  return await subjectRepository.getAllSubjects();
};

exports.getSubjectById = async (id) => {
  return await subjectRepository.getSubjectById(id);
};

exports.updateSubject = async (id, updatedData) => {
  return await subjectRepository.updateSubject(id, updatedData);
};

exports.deleteSubject = async (id) => {
  return await subjectRepository.deleteSubject(id);
};
