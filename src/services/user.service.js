// const UserModel = require('../models/user.model');
const UserRepository = require('../repository/user.repository');
const { hashPassword, verifyPassword } = require('../lib/bcryptfunc');

const getAllUsers = async () => {
    const users = await UserRepository.getAllUsers();
    if (!users) {
        throw { isSuccess: false, message: 'No users found', users: null };
    }
    return { isSuccess: true, message: 'Users retrieved successfully', users: users };
}

const getUserById = async (userId) => {
    const user = await UserRepository.getUserById(userId);
    if (!user) {
        throw { isSuccess: false, message: 'User not found', user: null };
    }
    return { isSuccess: true, message: 'User retrieved successfully', user: user };
};

const updateUser = async (userId, updateData) => {
    const user = await UserRepository.getUserById(userId);
    if (!user) {
        throw { isSuccess: false, message: 'User not found', user: null };
    }

    if (updateData.email) {
        const existingUser = await UserRepository.getUser({ email: updateData.email });
        if (existingUser && existingUser._id.toString() !== userId) {
            throw { isSuccess: false, message: 'This email is already registered.', user: null };
        }
    }
    
    if (updateData.phone) {
        const existingUser = await UserRepository.getUser({ phone: updateData.phone });
        if (existingUser && existingUser._id.toString() !== userId) {
            throw { isSuccess: false, message: 'This phone number is already registered.', user: null };
        }
    }

    if (updateData.userName) {
        const existingUser = await UserRepository.getUser({ userName: updateData.userName });
        if (existingUser && existingUser._id.toString() !== userId) {
            throw { isSuccess: false, message: 'This username is taken.', user: null };
        }
    }

    if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
    }

    updateData.updatedAt = new Date();

    const newUser = await UserRepository.updateUserById(userId, updateData, { new: true });

    if (!newUser) {
        throw { isSuccess: false, message: 'User update failed', user: null };
    }

    newUser.password = undefined;

    return { isSuccess: true, message: 'User updated successfully', user: newUser };
};

module.exports = {
    getUserById,
    updateUser,
    getAllUsers
}