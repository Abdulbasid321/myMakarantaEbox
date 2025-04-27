const subjectService = require('../services/subeject.service');

exports.createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSubject = await subjectService.createSubject({ name, description });
    res.status(201).json({ message: 'Subject created successfully', newSubject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const subject = await subjectService.getSubjectById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const updatedData = req.body;
    const updatedSubject = await subjectService.updateSubject(subjectId, updatedData);
    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject updated successfully', updatedSubject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const deletedSubject = await subjectService.deleteSubject(subjectId);
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
