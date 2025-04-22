// routes/contentRoutes.js
const { Router } = require('express');
const contentController = require('../controllers/content.controller');
const adminAuth = require('../middleware/admin'); // Assuming this is middleware for admin authentication

const router = Router();

// Route to upload content (video or pdf)
router.post('/content', adminAuth.authenticate('jwt', { session: false }), contentController.uploadContent);

// Route to get content by subject
router.get('/content/:subjectId', contentController.getContentBySubject);


module.exports = router;
