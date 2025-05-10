const subjectRepository = require('../repository/subject.repository');

exports.createSubject = async (data) => {
  return await subjectRepository.createSubject(data);
};

exports.getAllSubjects = async () => {
  return await subjectRepository.getAllSubjects();
};

exports.getSubjectWithLessons = async (id) => {
  return await subjectRepository.getSubjectWithLessons(id);
};

exports.deleteSubject = async (id) => {
  return await subjectRepository.deleteSubject(id);
};
