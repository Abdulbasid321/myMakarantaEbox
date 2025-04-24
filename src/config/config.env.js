require('dotenv').config();

module.exports = {

  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SENDERS_EMAIL: process.env.SENDERS_EMAIL,
  SENDERS_PASSWORD: process.env.SENDERS_PASSWORD,

} = process.env;
