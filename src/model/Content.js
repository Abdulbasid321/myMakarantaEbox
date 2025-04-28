// models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'pdf'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true, // Cloudinary or local path
  },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
