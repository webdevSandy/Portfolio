const Skill = require('../models/Skill');

/**
 * GET /api/skills
 */
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/skills/:id
 */
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill group not found.' });
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * POST /api/skills   [Protected]
 */
exports.createSkill = async (req, res) => {
  try {
    const skill = await new Skill(req.body).save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * PUT /api/skills/:id   [Protected]
 */
exports.updateSkill = async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Skill group not found.' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * PATCH /api/skills/:id/items   [Protected]
 * Replace only the items array inside a group.
 */
exports.updateItems = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items))
      return res.status(400).json({ error: 'items must be an array.' });

    const updated = await Skill.findByIdAndUpdate(
      req.params.id, { items }, { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Skill group not found.' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * DELETE /api/skills/:id   [Protected]
 */
exports.deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Skill group not found.' });
    res.json({ message: 'Skill group deleted successfully.', _id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
