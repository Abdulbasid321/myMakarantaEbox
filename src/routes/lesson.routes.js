const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const lessonController = require('../controllers/lesson.controller');

router.post('/uploadMedia', upload.single('media'), lessonController.uploadLesson);
router.get('/getAllMedia', lessonController.getAllMedia);
router.get('/media/:filename', lessonController.serveMediaFile);
router.delete('/deleteMedia/:id', lessonController.deleteMedia);

module.exports = router;
