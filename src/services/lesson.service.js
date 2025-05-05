const lessonRepository = require('../repository/lesson.repository');
const cloudinary = require('../utils/cloudinary'); 

exports.uploadLesson = async (req) => {
  if (!req.file) {
    throw new Error('File upload failed. Please try again.');
  }

  const { subjectId, title, type, description } = req.body;
  const { path } = req.file;

  if (!path) {
    throw new Error('File path not found after upload.');
  }

  // Upload file to cloudinary
  const uploadedLesson = await cloudinary.uploader.upload(path, {
    resource_type: 'auto', // important! because it could be pdf or video
    folder: 'lessons', 
  });

  if (!uploadedLesson || !uploadedLesson.secure_url) {
    throw new Error('Failed to upload file to Cloudinary.');
  }

  // Create lesson with correct fields
  const lesson = await lessonRepository.createLesson({
    subjectId,
    title,
    type,
    fileUrl: uploadResult.secure_url, // Cloudinary URL
    description,
  });

  return lesson;
};

exports.getAllMedia = async () => {
  return await lessonRepository.getAllMedia();
};

exports.getMediaUrl = async (filename) => {
  const mediaItem = await lessonRepository.findMediaByName(filename);
  return mediaItem ? mediaItem.mediaUrl : null;
};

exports.deleteMedia = async (id) => {
  const mediaItem = await lessonRepository.findMediaById(id);

  if (!mediaItem) {
    throw new Error('Media not found');
  }

  if (!mediaItem.mediaName) {
    throw new Error('MediaName is not defined for this item');
  }

  const publicId = mediaItem.mediaName.split('/').pop().split('.')[0];
  await cloudinary.uploader.destroy(publicId);
  await galleryRepository.deleteMediaById(id);
};
