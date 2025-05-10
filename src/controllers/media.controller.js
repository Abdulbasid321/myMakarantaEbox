const mediaService = require("../services/media.service");
exports.uploadMedia = async (req, res) => {
  try {
    const media = await mediaService.uploadMedia(req); // ✅ Pass full req
    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.uploadMedia = async (req, res) => {
//   try {
//     const media = await mediaService.uploadMedia(req.body);
//     res.status(201).json(media);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getAllMedia = async (req, res) => {
  try {
    const media = await mediaService.getAllMedia();
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
