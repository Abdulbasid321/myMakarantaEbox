const { success, unauthorized, badRequest, notFound } = require('../helpers/AppResponse');
const userService = require('../services/user.service');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { users, message, success } = await userService.getAllUsers();
    return success ? success(res, users, message) : badRequest(res, users, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

// Get a user by ID
const getUser = async (req, res) => {
  try {
    const  { user, message, success } = await userService.getUser(req.params.id);
    return success ? success(res, user, message) : ((!user) && !success) ? notFound(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { user, message, success } = await userService.updateUser(req.params.id, req.body);
   return success ? success(res, user, message) : ((!user) && !success) ? notFound(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
}