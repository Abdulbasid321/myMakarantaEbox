const { success, unauthorized, badRequest, notFound } = require('../helpers/AppResponse');
const authService = require('../services/auth.service');

// const createUser = async (req, res) => {
//   try {
//     console.log("Incoming request body:", req.body);
//     const { user, message, isSuccess } = await authService.createUser(req.body);
//     return isSuccess ? success(res, user, message) : badRequest(res, message);
//   } catch (error) {
//     console.log("Error during user creation:", error);
//     // return badRequest(res, error.message);
//     return badRequest(res, null, error.message);
//   }
// };

// const createUser = async (req, res) => {
//   try {

//     const profilePic = req.file ? req.file.path : null;
//     const userData = { ...req.body, profilePic };

//     console.log("Incoming request body:", userData);
//     const { user, message, isSuccess } = await authService.createUser(userData);
//     return isSuccess ? success(res, user, message) : badRequest(res, user, message);
//   } catch (error) {
//     console.log("Error during user creation:", error);
//     // return badRequest(res, error.message);
//     return badRequest(res, null, error.message);

//   }
// };
const createUser = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    const { user, message, isSuccess } = await authService.createUser(req.body);
    
    if (isSuccess) {
      return success(res, user, message); // Success response
    } else {
      return badRequest(res, message); // Failure response (e.g., email exists)
    }
  } catch (error) {
    console.log("Error during user creation:", error);
    
    // If the error contains a message, send it to the frontend
    if (error.message) {
      return badRequest(res, error.message); // Return the specific error message
    }

    // If no specific message is found, return a general error
    return badRequest(res, 'An error occurred while creating your account. Please try again.');
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

// const forgotPassword = async (req, res) => {
//     try {
//       const { user, message, isSuccess } = await authService.forgotPassword(req.params.email);
//       return isSuccess ? success(res, user, message) : badRequest(res, user, message);
//     } catch (error) {
//       return badRequest(res, error.message);
//     }
//   };

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const { user, message, isSuccess } = await authService.forgotPassword(email);
    return isSuccess ? success(res, user, message) : badRequest(res, user, message);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const { user, message, isSuccess } = await authService.forgotPassword(email);
//     return isSuccess ? success(res, user, message) : badRequest(res, user, message);
//   } catch (error) {
//     return badRequest(res, error.message);
//   }
// };

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