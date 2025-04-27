const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('\nMongoDB Connected');
  }).catch((err) => {
    console.log('\nMongoDB Connection Failed: ', err);
    process.exit(1);
  })
};

module.exports = connectDB;