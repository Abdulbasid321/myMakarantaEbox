const cloudinary = require('cloudinary').v2;
const mediaRepository = require('../repository/media.repository');

exports.uploadMedia = async (req) => {
  if (!req.file) {
    throw new Error('File upload failed. Please try again.');
  }

  const { mediaType, mediaFor } = req.body;
  const { path } = req.file;

  if (!path) {
    throw new Error('File path not found after upload.');
  }

  // Upload to Cloudinary
  const uploadedMedia = await cloudinary.uploader.upload(path, {
    resource_type: 'auto',
    folder: 'media',
  });

  if (!uploadedMedia || !uploadedMedia.secure_url) {
    throw new Error('Failed to upload file to Cloudinary.');
  }

  // Save media details in DB
  const media = await mediaRepository.createMedia({
    mediaUrl: uploadedMedia.secure_url,
    mediaType,
    mediaFor,
  });

  return media;
};

// exports.uploadMedia = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'File upload failed. Please try again.' });
//     }

//     const { mediaType, mediaFor } = req.body;
//     const { path } = req.file;

//     const uploadedMedia = await cloudinary.uploader.upload(path, {
//       resource_type: 'auto',
//       folder: 'media',
//     });

//     if (!uploadedMedia || !uploadedMedia.secure_url) {
//       return res.status(500).json({ error: 'Failed to upload file to Cloudinary.' });
//     }

//     const media = await mediaRepository.createMedia({
//       mediaUrl: uploadedMedia.secure_url,
//       mediaType,
//       mediaFor,
//     });

//     return res.status(201).json({ media });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };
