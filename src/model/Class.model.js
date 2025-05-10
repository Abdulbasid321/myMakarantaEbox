// models/Class.js
const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String
}, {
  timestamps: true,
  collection: "classes"
});

module.exports = mongoose.model("classes", ClassSchema);
