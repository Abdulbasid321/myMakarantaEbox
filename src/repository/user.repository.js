const UserModel = require('../models/User.model');

const createUser = async (userData) => {
    const user = new UserModel(userData);
    await user.save();
    return user;
};


const getAllUsers = async () => {
    return await UserModel.find();
};

const getUserById = async (userId) => {
    return await UserModel.findById(userId);
};

const getUser = async (query) => {
    return await UserModel.findOne(query);
};

const updateUserById = async (userId, updateData, updateOptions) => {
    return await UserModel.findByIdAndUpdate(userId, updateData, updateOptions);
};

const updateUser = async (query, updateData, updateOptions) => {
    return await UserModel.findOneAndUpdate (query, updateData, updateOptions);
};

module.exports = {
    createUser,
    getUserById,
    getUser,
    updateUserById,
    updateUser,
    getAllUsers
};