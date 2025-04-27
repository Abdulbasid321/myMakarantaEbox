// controllers/contentController.js
const Lesson = require('../model/Lesson');
const Subject = require('../model/Subject');

// Controller method to upload content
exports.uploadLesson = async (req, res) => {
  const { subjectId, title, type, fileUrl, description } = req.body;
  try {
    // Check if the subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const lesson = new Lesson({
      subjectId,
      title,
      type,
      fileUrl,
      description
    });
    await lesson.save();
    res.status(201).json({ message: 'Content uploaded successfully', lesson });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller method to get content by subject
exports.getContentBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const content = await Content.find({ subjectId }).populate('subjectId', 'name');
    if (!content.length) {
      return res.status(404).json({ message: 'No content found for this subject' });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
