// controllers/contentController.js
const Content = require('../model/Content');
const Subject = require('../model/Subject');

// Controller method to upload content
exports.uploadContent = async (req, res) => {
  const { subjectId, title, type, fileUrl, description } = req.body;
  try {
    // Check if the subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const content = new Content({
      subjectId,
      title,
      type,
      fileUrl,
      description
    });
    await content.save();
    res.status(201).json({ message: 'Content uploaded successfully', content });
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
