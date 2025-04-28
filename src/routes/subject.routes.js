// routes/subjectRoutes.js
const { Router } = require('express');
const subjectController = require('../controllers/subject.controller');
const adminAuth = require('../middleware/admin'); // Assuming this is middleware for admin authentication

const router = Router();

// Route to create a new subject
router.post('/subject', 
    // adminAuth.authenticate('jwt', { session: false }), 
    subjectController.createSubject);

// Route to get all subjects
router.get('/subject', subjectController.getAllSubjects);

module.exports = router;
