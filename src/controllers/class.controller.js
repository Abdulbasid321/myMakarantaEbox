const classService = require('../services/class.service');

exports.createClass = async (req, res) => {
  try {
    const newClass = await classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await classService.getAllClasses();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const oneClass = await classService.getClassById(req.params.id);
    if (!oneClass) return res.status(404).json({ error: "Class not found" });
    res.status(200).json(oneClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const deleted = await classService.deleteClass(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Class not found" });
    res.status(200).json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
