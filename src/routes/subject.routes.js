// const express = require('express');
// const router = express.Router();
// const subjectController = require('../controllers/subject.controller');
// const adminAuth = require('../middleware/admin'); // Assuming this is middleware for admin authentication
// const { createStuffs } = require('../helpers/roleAccess');
// const { jwtVerify } = require('../middleware/jwtMiddleware');

// // const router = router();

// // Route to create a new subject
// router.post('/', 
//     // jwtVerify, 
//     // createStuffs, 
//     subjectController.createSubject);

// // Route to get all subjects
// router.get('/', 
//     // wtVerify, 
//     subjectController.getAllSubjects);

// // Route to get a subject
// // router.get('/:subjectId', jwtVerify, subjectController.getSubject);

// module.exports = router;
const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller');

// Create a new subject
router.post('/', subjectController.createSubject);

// Get all subjects
router.get('/', subjectController.getAllSubjects);

// Get a subject and its lessons
router.get('/:id', subjectController.getSubjectWithLessons);

// Delete a subject
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
