// const { success, unauthorized, badRequest, notFound } = require('../helpers/AppResponse');
// const subjectService = require('../services/subeject.service');

// const getAllSubjects = async (req, res) => {
//   try {
//     const { users, message, isSuccess } = await userService.getAllSubjects();
//     return isSuccess ? success(res, users, message) : badRequest(res, users, message);
//   } catch (error) {
//     return badRequest(res, error.message);
//   }
// };

// const getSubject = async (req, res) => {
//   try {
//     const  { user, message, isSuccess } = await userService.getSubject(req.params.userId);
//     return isSuccess ? success(res, user, message) : ((!user) && !isSuccess) ? notFound(res, user, message) : badRequest(res, user, message);
//   } catch (error) {
//     return badRequest(res, error.message);
//   }
// };


const subjectService = require('../services/subeject.service');

exports.createSubject = async (req, res) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubjectWithLessons = async (req, res) => {
  try {
    const data = await subjectService.getSubjectWithLessons(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
