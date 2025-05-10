

// const mongoose = require('mongoose');

// const SubjectSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   subjectCode: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   image: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "medias",
//     required: false,
//   },
//   noOfLessons: {
//     type: Number,
//     required: true,
//   },
//   // classId: { // 🔥 This line links the subject to a class
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: "classes", // assumes you have or will create a Class model
//   //   required: true
//   // }

//   academicLevel: {
//     type: String,
//     enum: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5'],
//     required: true
//   },

 

// }, {
//   collection: "subjects",
//   timestamps: true,
// });

// const Subject = mongoose.model("subjects", SubjectSchema);
// module.exports = Subject;


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
    required: false,
  },
  noOfLessons: {
    type: Number,
    required: true,
  },
  academicLevel: {
    type: String,
    enum: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5'],
    required: true
  },
}, {
  collection: "subjects",
  timestamps: true,
  toJSON: { virtuals: true },    // Enable virtuals in JSON output
  toObject: { virtuals: true }   // Enable virtuals in Object output
});

// 🔥 Add virtual for `lessons`
SubjectSchema.virtual('lessons', {
  ref: 'lessons',               // This is your Lesson model
  localField: '_id',            // Link subject._id
  foreignField: 'subject'       // To lessons.subject
});

const Subject = mongoose.model("subjects", SubjectSchema);
module.exports = Subject;
