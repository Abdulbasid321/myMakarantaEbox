const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller');


router.post('/create', subjectController.createSubject);

router.get('/', subjectController.getAllSubjects);

router.get('/:id', subjectController.getSubjectById);

router.put('/update/:id', subjectController.updateSubject);

router.delete('/delete/:id', subjectController.deleteSubject);

module.exports = router;
