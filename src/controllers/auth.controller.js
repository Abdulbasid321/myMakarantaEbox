const { success, unauthorized, badRequest, notFound } = require('../helpers/AppResponse');
const authService = require('../services/auth.service');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { user, message, isSuccess } = await authService.createUser(req.body);
    return isSuccess ? success(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    console.log(error);
    return badRequest(res, error.message);
  }
};

const resendOtp = async (req, res) => {
  try {
    const { user, message, isSuccess } = await authService.resendOtp(req.params.email);
    return isSuccess ? success(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    console.log(error);
    return badRequest(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { data, message, isSuccess } = await authService.login(req.body);
    return success(res, data, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { user, message, isSuccess } = await authService.verifyEmail(req.body);
    return isSuccess ? success(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const forgotPassword = async (req, res) => {
    try {
      const { user, message, isSuccess } = await authService.forgotPassword(req.params.email);
      return isSuccess ? success(res, user, message) : badRequest(res, user, message);
    } catch (error) {
      return badRequest(res, error.message);
    }
  };

  const verifyCode = async (req, res) => {
    try {
      const { user, message, isSuccess } = await authService.verifyCode(req.params.otpCode);
      return isSuccess ? success(res, user, message) : badRequest(res, user, message);
    } catch (error) {
      return badRequest(res, error.message);
    }
  };

  const resetPassword = async (req, res) => {
    try {
      const { user, message, isSuccess } = await authService.resetPassword(req.body);
      return isSuccess ? success(res, user, message) : badRequest(res, user, message);
    } catch (error) {
      return badRequest(res, error.message);
    }
  };



module.exports = {
   createUser,
   login,
   verifyEmail,
   resendOtp,
   forgotPassword,
   verifyCode,
   resetPassword
}