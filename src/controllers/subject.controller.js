// controllers/subjectController.js
const Subject = require('../model/Subject');

// Controller method to create a subject
exports.createSubject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingSubject = await Subject.findOne({ name });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject already exists' });
    }

    const subject = new Subject({ name, description });
    await subject.save();
    res.status(201).json({ message: 'Subject created successfully', subject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller method to get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
