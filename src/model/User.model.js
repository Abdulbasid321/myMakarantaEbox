const mongoose = require("mongoose");
const constants = require("../constants/index");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  otherName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
    unique: [true, "User name already exists"],
    minlength: [3, "User name must be at least 3 characters long"],
    maxlength: [20, "User name must be at most 15 characters long"],
    match: [/^[a-zA-Z0-9_]+$/, "User name can only contain letters, numbers, and underscores"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: [true, "Phone number already exists"],
    match: [/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"],
    minlength: [10, "Phone number must be at least 10 characters long"],
    maxlength: [15, "Phone number must be at most 15 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    lowercase: true,
    match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    enum: [...constants.roles],
    required: true,
    default: "student",
  },
  academicLevel: {
    type: String,
    enum: [...constants.academicLevel],
    required: true,
  },
  status: {
    type: String,
    enum: [...constants.userStatus],
    required: true,
    default: "active",
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpires: {
    type: Date,
    default: null,
  },
    profilePic: {
    type: String,
    default: null,
  },

}, { 
    collection: "users",
    timestamps: true,
});

// UserSchema.set("toJSON", {
//     virtuals: true,
//     transform: (doc, ret) => {
//         delete ret.__v;
//         if (ret.academicLevel) {
//             switch (ret.academicLevel) {
//                 case value:
                    
//                     break;
            
//                 default:
//                     break;
//             }
//             ret.resolvedAt = ret.resolvedAt.toISOString();
//         }
//     }
// });

const User = mongoose.model("users", UserSchema);
module.exports = User;