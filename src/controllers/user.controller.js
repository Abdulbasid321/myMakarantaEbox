const { success, unauthorized, badRequest, notFound } = require('../helpers/AppResponse');
const userService = require('../services/user.service');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { users, message, isSuccess } = await userService.getAllUsers();
    return isSuccess ? success(res, users, message) : badRequest(res, users, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

// Get a user by ID
const getUser = async (req, res) => {
  try {
    const  { user, message, isSuccess } = await userService.getUserById(req.params.userId);
    return isSuccess ? success(res, user, message) : ((!user) && !isSuccess) ? notFound(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { user, message, isSuccess } = await userService.updateUser(req.params.id, req.body);
   return isSuccess ? success(res, user, message) : ((!user) && !isSuccess) ? notFound(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
}