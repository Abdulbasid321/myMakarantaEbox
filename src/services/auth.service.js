// const UserModel = require('../models/user.model');
const UserRepository = require('../repository/user.repository');
const { hashPassword, verifyPassword } = require('../lib/bcryptfunc');
const { genAccessToken, genRefreshToken } = require('../lib/jwtfunc');
const generateRandomSixDigitNumber = require('../utils/randomNumberGen');
const sendEmail = require('../lib/sendEmail');

const createUser = async (userData) => {
    let { email, password } = userData;
    const existingUser = await UserRepository.getUser({email});

    if(existingUser.isVerified) {
        throw { isSuccess: false, message: 'Email is already taken', user: null };
    }

    const otp = generateRandomSixDigitNumber();
    userData.otp = otp;
    userData.otpExpires = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes expiry

    userData.password = await hashPassword(password);
    const user = await UserRepository.createUser(userData);
    if(!user) {
        throw { isSuccess: false, message: 'User creation failed', user: null };
    }
    // send email on successful signup
    await sendEmail(
        user.email,
        "Welcome to MyMakaranta e-box",
        {
          email: user.email,
          otp: user.otp,
          name: user.name,
        },
        "../src/views/register-otp-send.ejs"
    );
    user.password = undefined;
    user.otp = undefined;
    user.otpExpires = undefined;
    return { isSuccess: true, message: 'User created successfully', user: user };
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

const login = async (userData) => {
    let { email, password } = userData;
    const user = await UserRepository.getUser({email: email});

    if(!user) {
        return { isSuccess: false, message: 'Invalid login details', user: null };
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if(!isPasswordValid) {
        throw { isSuccess: false, message: 'Invalid login details', user: null };
    }

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
        firstName: user.firstName,
        lasttName: user.lasttName,
        userName: user.userName,
        phone: user.phone,
    };

    const accessToken = genAccessToken(payload);
    const refreshToken = genRefreshToken(payload);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.password = undefined;
    
    return { message: 'Logged in successfully', data: { user, accessToken, refreshToken } };
};

const forgotPassword = async(email) => {
    const user = UserRepository.getUser({email: email});
    if(!user) {
        throw { isSuccess: false, message: 'Invalid email address', user: null };
    }

    const otp = generateRandomSixDigitNumber();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes expiry

    // send email on successful signup
    await sendEmail(
        user.email,
        "Reset Password",
        {
          email: user.email,
          otp: user.otp,
          name: user.name,
        },
        "../src/views/reset-password.ejs"
    );
    return { isSuccess: true, message: 'Reset password OTP sent to your email', user: user };
}

const resetPassword = async(userData) => {
    const { email, otp, newPassword } = userData;
    let user = await UserRepository.getUser({email: email});

    if(!user) {
        throw { isSuccess: false, message: 'Invalid email', user: null };
    }

    if(user.otp !== otp) {
        throw { isSuccess: false, message: 'Invalid OTP', user: null };
    }

    if(user.otpExpires < Date.now()) {
        throw { isSuccess: false, message: 'OTP expired', user: null };
    }

    user.password = await hashPassword(newPassword);
    user.otp = null;
    user.otpExpires = null;

    user = await UserRepository.updateUserById(user._id, user, { new: true });
    user.password = undefined;

    return { isSuccess: true, message: 'Password reset successfully', user: user };
}


module.exports = {
    createUser,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword
}