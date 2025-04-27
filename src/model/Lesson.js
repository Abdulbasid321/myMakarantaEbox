// models/Content.js
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
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
    required: true,
  },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
