// const MediaModel = require('../model/Media.model');

// const createMedia = async (mediaData) => {
//     const Media = new MediaModel(mediaData);
//     await Media.save();
//     return Media;
// };


// const getAllMedias = async () => {
//     return await MediaModel.find();
// };

// const getMediaById = async (mediaId) => {
//     return await MediaModel.findById(mediaId);
// };

// const getMedia = async (query) => {
//     return await MediaModel.findOne(query);
// };

// const updateMediaById = async (MediaId, updateData, updateOptions) => {
//     return await MediaModel.findByIdAndUpdate(MediaId, updateData, updateOptions);
// };

// const updateMedia = async (query, updateData, updateOptions) => {
//     return await MediaModel.findOneAndUpdate (query, updateData, updateOptions);
// };

// module.exports = {
//     createMedia,
//     getMediaById,
//     getMedia,
//     updateMediaById,
//     updateMedia,
//     getAllMedias
// };


const MediaModel = require('../model/Media.model');

const createMedia = async (mediaData) => {
  const media = new MediaModel(mediaData);
  return await media.save();
};

const getAllMedias = async () => {
  return await MediaModel.find().sort({ createdAt: 1 }); // sorted by creation date (oldest to newest)
};

// Get media by its ID
const getMediaById = async (mediaId) => {
  return await MediaModel.findById(mediaId);
};

// Get a single media by query
const getMedia = async (query) => {
  return await MediaModel.findOne(query);
};

// Update media by ID
const updateMediaById = async (mediaId, updateData, updateOptions = { new: true }) => {
  return await MediaModel.findByIdAndUpdate(mediaId, updateData, updateOptions);
};

// Update media by a filter/query
const updateMedia = async (query, updateData, updateOptions = { new: true }) => {
  return await MediaModel.findOneAndUpdate(query, updateData, updateOptions);
};

module.exports = {
  createMedia,
  getAllMedias,
  getMediaById,
  getMedia,
  updateMediaById,
  updateMedia,
};
