const classRepository = require('../repository/class.repository');

exports.createClass = async (data) => {
  return await classRepository.createClass(data);
};

exports.getAllClasses = async () => {
  return await classRepository.getAllClasses();
};

exports.getClassById = async (id) => {
  return await classRepository.getClassById(id);
};

exports.deleteClass = async (id) => {
  return await classRepository.deleteClass(id);
};
