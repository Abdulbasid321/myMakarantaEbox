// models/Subject.js
const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
    required: [true, "A lesson must belong to a Subject"]
  },
  content: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true
  },
  pdf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medias",
    required: [false, "A pdf can belong to a Media"]
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medias",
    required: [false, "A video can belong to a Media"]
  }
}, {
  collection: "lessons",
  timestamps: true,
});

// const Lesson = mongoose.model("lessons", LessonSchema);
module.exports = mongoose.models.lessons || mongoose.model("lessons", LessonSchema);

// module.exports = Lesson;
