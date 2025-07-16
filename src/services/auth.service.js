// const UserModel = require('../models/user.model');
const UserRepository = require('../repository/user.repository');
const Subject = require('../model/Subject.model');
const { hashPassword, verifyPassword } = require('../lib/bcryptfunc');
const { genAccessToken, genRefreshToken } = require('../lib/jwtfunc');
const generateRandomSixDigitNumber = require('../utils/randomNumberGen');
const sendEmail = require('../lib/sendEmail');

const createUser = async (userData) => {
  const { email, password } = userData;

  const existingUser = await UserRepository.getUser({ email });

  if (existingUser?.isVerified) {
    throw {
      isSuccess: false,
      message: 'Email is already taken',
      user: null,
    };
  }

  // ✅ Generate OTP as a string
  const otp = generateRandomSixDigitNumber(); // now returns string
  userData.otp = otp;
  userData.otpExpires = new Date(Date.now() + 3 * 60 * 1000); // 3 min expiry

  // ✅ Hash password and lowercase username
  userData.password = await hashPassword(password);
  userData.userName = userData.userName.toLowerCase();

  // ✅ Create user
  const user = await UserRepository.createUser(userData);

  if (!user) {
    throw {
      isSuccess: false,
      message: 'User creation failed',
      user: null,
    };
  }

  // ✅ Send email with OTP
  await sendEmail(
    user.email,
    'Welcome to MyMakaranta e-box',
    {
      email: user.email,
      otp: user.otp,
      name: user.userName,
    },
    '../src/views/register-otp-send.ejs'
  );

  // ✅ Do NOT clear OTP here! (or only do this before sending response)
  user.password = undefined;
  user.otp = undefined;
  user.otpExpires = undefined;

  return {
    isSuccess: true,
    message: 'User created successfully',
    user,
  };
};

const verifyEmail = async (userData) => {
    const { email, otp } = userData;
    let user = await UserRepository.getUser({email: email});

    if(!user) {
        throw { isSuccess: false, message: 'User not found', user: null };
    }

    if(user.otp !== otp) {
        throw { isSuccess: false, message: 'Invalid OTP', user: null };
    }

    if(user.otpExpires < Date.now()) {
        throw { isSuccess: false, message: 'OTP expired', user: null };
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    user = await UserRepository.updateUserById(user._id, user, { new: true });
    user.password = undefined;

    return { isSuccess: true, message: 'Email verified successfully', user: user };
};

const resendOtp = async (email) => {
    let user = await UserRepository.getUser({email});

    if(!user) {
        throw { isSuccess: false, message: 'Invalid user email', user: null };
    }

    const otp = generateRandomSixDigitNumber();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes expiry

    user = await UserRepository.updateUserById(user._id, user, { new: true });
    user.password = undefined;
    if(!user) {
        throw { isSuccess: false, message: 'User otp details update failed', user: null };
    }
    // send email on successful signup
    await sendEmail(
        user.email,
        "Welcome to MyMakaranta e-box",
        {
          email: user.email,
          otp: user.otp,
          name: user.userName,
        },
        "../src/views/register-otp-send.ejs"
    );

    user.password = undefined;
    user.otp = undefined;
    user.otpExpires = undefined;
    return { isSuccess: true, message: 'otp resent successfully', user: user };
};

const login = async (userData) => {
    const { email, password } = userData;
    const user = await UserRepository.getUser({ email });

    if (!user) {
        return { isSuccess: false, message: 'Invalid login details', user: null };
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        return { isSuccess: false, message: 'Invalid login details', user: null };
    }

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        phone: user.phone,
    };

    const accessToken = genAccessToken(payload);
    const refreshToken = genRefreshToken(payload);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.password = undefined;

    // 🎯 Fetch all subjects based on the user's academicLevel
    const subjects = await Subject.find({ academicLevel: user.academicLevel }) // assuming classId refers to academicLevel
        .populate({
            path: 'lessons',
            populate: [
                { path: 'pdf' },
                { path: 'video' }
            ]
        })
        .sort({ createdAt: -1 });

    return {
        message: 'Logged in successfully',
        data: {
            user,
            subjects,
            accessToken,
            refreshToken
        }
    };
};

const forgotPassword = async(email) => {
    let user = await UserRepository.getUser({ email: email });

    if(!user) {
        throw { isSuccess: false, message: 'Invalid email address', user: null };
    }

    const otp = generateRandomSixDigitNumber();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes expiry
    user = await UserRepository.updateUserById(user._id, user, { new: true });
    user.password = undefined;

    // send email on successful signup
    await sendEmail(
        user.email,
        "Reset Password",
        {
          email: user.email,
          otp: user.otp,
          name: user.userName,
        },
        "../src/views/reset-password.ejs"
    );
    return { isSuccess: true, message: 'Reset password OTP sent to your email', user: user };
}

const resetPassword = async(userData) => {
  const { email, newPassword } = userData;

  // Get user by email
  let user = await UserRepository.getUser({ email });

  if (!user) {
    throw { isSuccess: false, message: 'Invalid email', user: null };
  }

  // Ensure user is verified before allowing password reset
  if (!user.isVerified) {
    throw { isSuccess: false, message: 'Email not verified. Please verify your email first.', user: null };
  }

  // Update password
  user.password = await hashPassword(newPassword);


  user.otp = null;
  user.otpExpires = null;

  user = await UserRepository.updateUserById(user._id, user, { new: true });

  user.password = undefined; // don't expose password
  return { isSuccess: true, message: 'Password reset successfully', user };
};



module.exports = {
    createUser,
    login,
    verifyEmail,
    resendOtp,
    forgotPassword,
    resetPassword
}