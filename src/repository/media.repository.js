const MediaModel = require('../model/Media.model');

const createMedia = async (mediaData) => {
    const Media = new MediaModel(mediaData);
    await Media.save();
    return Media;
};


const getAllMedias = async () => {
    return await MediaModel.find();
};

const getMediaById = async (mediaId) => {
    return await MediaModel.findById(mediaId);
};

const getMedia = async (query) => {
    return await MediaModel.findOne(query);
};

const updateMediaById = async (MediaId, updateData, updateOptions) => {
    return await MediaModel.findByIdAndUpdate(MediaId, updateData, updateOptions);
};

const updateMedia = async (query, updateData, updateOptions) => {
    return await MediaModel.findOneAndUpdate (query, updateData, updateOptions);
};

module.exports = {
    createMedia,
    getMediaById,
    getMedia,
    updateMediaById,
    updateMedia,
    getAllMedias
};