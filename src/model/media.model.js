const mongoose = require('mongoose');
const constants = require("../constants/index");

const MediaSchema = new mongoose.Schema({
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: [...constants.mediaType],
    required: true,
  },
  mediaFor: {
    type: String,
    enum: [...constants.mediaFor],
    required: true,
  }
}, { 
  collection: "medias",
  timestamps: true,
});

const Media = mongoose.model("medias", MediaSchema);
module.exports = Media;