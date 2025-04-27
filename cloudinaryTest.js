require('dotenv').config(); // Load env variables first

const cloudinary = require('./src/utils/cloudinary'); // adjust the path

cloudinary.api.ping()
  .then(res => {
    console.log("✅ Cloudinary Connected Successfully:", res);
  })
  .catch(err => {
    console.error("❌ Cloudinary Connection Failed:", err);
  });
