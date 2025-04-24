// const mongoose = require('mongoose');
// const { isEmail } = require('validator')

// const userSchema = mongoose.Schema({
//     fullName: {
//         type: String,
//         required: [true, 'please enter the student firstName'],
//         lowerCase: true,
//     },

//     email: {
//         type: String,
//         required: [true, 'plaese enter the student email email'],
//         unique: true,
//         lowerCase: true,
//         validate: [isEmail, 'please enter a valid email']
//     },

//     password: {
//         type: String,
//         required: [true, 'please enter your password'],
//         minlength: [6, 'the minimun length for password is 6 characters'],
//     },

//     isSynced: { type: Boolean, default: false }, // mark if synced with server
//     createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.model('user', userSchema);
// module.exports = User;

const mongoose = require('mongoose');
const { isEmail } = require('validator')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'please enter a valid email']
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
