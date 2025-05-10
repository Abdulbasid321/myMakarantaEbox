// const lessonService = require('../services/lesson.service');

// exports.uploadLesson = async (req, res) => {
//   try {
//     const mediaItem = await lessonService.uploadLesson(req);
//     res.status(201).json({ message: 'Media uploaded successfully', mediaItem });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getAllMedia = async (req, res) => {
//   try {
//     const galleryItems = await lessonService.getAllMedia();
//     res.status(200).json(galleryItems);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.serveMediaFile = async (req, res) => {
//   try {
//     const mediaUrl = await lessonService.getMediaUrl(req.params.filename);
//     if (!mediaUrl) {
//       return res.status(404).json({ message: 'Media not found' });
//     }
//     res.redirect(mediaUrl);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteMedia = async (req, res) => {
//   try {
//     await lessonService.deleteMedia(req.params.id);
//     res.status(200).json({ message: 'Media deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const lessonService = require('../services/lesson.service');

exports.createLesson = async (req, res) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await lessonService.getAllLessons();
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await lessonService.deleteLesson(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// const lessonService = require('../services/lesson.service');

// exports.createLesson = async (req, res) => {
//   try {
//     const lesson = await lessonService.createLesson(req.body);
//     res.status(201).json(lesson);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getAllLessons = async (req, res) => {
//   try {
//     const lessons = await lessonService.getAllLessons();
//     res.status(200).json(lessons);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getLessonById = async (req, res) => {
//   try {
//     const lesson = await lessonService.getLessonById(req.params.id);
//     if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
//     res.status(200).json(lesson);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteLesson = async (req, res) => {
//   try {
//     const deleted = await lessonService.deleteLesson(req.params.id);
//     if (!deleted) return res.status(404).json({ error: 'Lesson not found' });
//     res.status(200).json({ message: 'Lesson deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
