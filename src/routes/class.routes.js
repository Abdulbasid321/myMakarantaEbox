const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.delete('/:id', classController.deleteClass);

module.exports = router;
