const { success, unauthorized, badRequest, notFound } = require('../helpers/AppResponse');
const subjectService = require('../services/subeject.service');

const getAllSubjects = async (req, res) => {
  try {
    const { users, message, isSuccess } = await userService.getAllSubjects();
    return isSuccess ? success(res, users, message) : badRequest(res, users, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const getSubject = async (req, res) => {
  try {
    const  { user, message, isSuccess } = await userService.getSubject(req.params.userId);
    return isSuccess ? success(res, user, message) : ((!user) && !isSuccess) ? notFound(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};
