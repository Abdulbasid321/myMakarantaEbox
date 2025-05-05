const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
    required: [true, "A quiz must belong to a Subject"]
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [ String ],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  }
}, { 
  collection: "quizzes",
  timestamps: true,
});

const Quiz = mongoose.model("quizzes", QuizSchema);
module.exports = Quiz;
