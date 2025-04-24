const SubjectModel = require('../model/Subject.model');

const createSubject = async (subjectData) => {
    const subject = new SubjectModel(subjectData);
    await subject.save();
    return subject;
};


const getAllSubjects = async () => {
    return await SubjectModel.find();
};

const getSubjectById = async (subjectId) => {
    return await SubjectModel.findById(subjectId);
};

const getSubject = async (query) => {
    return await SubjectModel.findOne(query);
};

const updateSubjectById = async (subjectId, updateData, updateOptions) => {
    return await SubjectModel.findByIdAndUpdate(subjectId, updateData, updateOptions);
};

const updateSubject = async (query, updateData, updateOptions) => {
    return await SubjectModel.findOneAndUpdate (query, updateData, updateOptions);
};

module.exports = {
    createSubject,
    getSubjectById,
    getSubject,
    updateSubjectById,
    updateSubject,
    getAllSubjects
};