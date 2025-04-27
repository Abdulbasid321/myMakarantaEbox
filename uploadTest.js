require('dotenv').config();
const cloudinary = require('./src/utils/cloudinary');// adjust path if needed
const path = require('path');

// Sample file path (must be a real file on your PC)
const filePath = path.join(__dirname, 'sample.pdf'); // or sample.mp4

async function uploadFile() {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto', // because it could be video, pdf, etc.
      folder: 'lessons', // optional: upload inside a "lessons" folder
    });

    console.log('✅ Upload Successful:', result.secure_url);
  } catch (err) {
    console.error('❌ Upload Failed:', err);
  }
}

uploadFile();
