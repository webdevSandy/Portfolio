const Experience = require('../models/Experience');

/**
 * GET /api/experience
 */
exports.getExperiences = async (req, res) => {
  try {
    const items = await Experience.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/experience   [Protected]
 */
exports.createExperience = async (req, res) => {
  try {
    const item = await new Experience(req.body).save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * PUT /api/experience/:id   [Protected]
 */
exports.updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Experience not found.' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * DELETE /api/experience/:id   [Protected]
 */
exports.deleteExperience = async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Experience not found.' });
    res.json({ message: 'Experience deleted successfully.', _id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
