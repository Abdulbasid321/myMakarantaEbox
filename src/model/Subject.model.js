// models/Subject.js
const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medias",
    required: [false, "An image can belong to a Media"]
  },
  noOfLessons: {
    type: Number,
    required: true,
  }
}, { 
  collection: "subjects",
  timestamps: true,
});

const Subject = mongoose.model("subjects", SubjectSchema);
module.exports = Subject;
