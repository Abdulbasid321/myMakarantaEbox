// const express = require("express");
// const router = express.Router();
// const mediaController = require("../controllers/mediaController");
// const upload = require("../middlewares/upload");

// router.post("/", upload.single("file"), mediaController.uploadMedia);

// module.exports = router;
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const lessonController = require('../controllers/media.controller');

router.post('/uploadMedia', upload.single('media'), lessonController.uploadMedia);
router.get('/getAllMedia', lessonController.getAllMedia);
// router.get('/media/:filename', lessonController.serveMediaFile);
router.delete('/deleteMedia/:id', lessonController.deleteMedia);

module.exports = router;

