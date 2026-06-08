const Project = require('../models/Project');

/**
 * GET /api/projects
 * Optional query params: ?featured=true &category= &status= &limit=
 */
exports.getProjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.featured === 'true') filter.featured = true;
    if (req.query.category)            filter.category = req.query.category;
    if (req.query.status)              filter.status   = req.query.status;

    const limit = req.query.limit ? parseInt(req.query.limit) : 0;

    const projects = await Project
      .find(filter)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(limit);

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/projects/:id
 */
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * POST /api/projects   [Protected]
 */
exports.createProject = async (req, res) => {
  try {
    const project = await new Project(req.body).save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * PUT /api/projects/:id   [Protected]
 */
exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Project not found.' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * PATCH /api/projects/:id/featured   [Protected]
 */
exports.toggleFeatured = async (req, res) => {
  try {
    const { featured } = req.body;
    if (typeof featured !== 'boolean')
      return res.status(400).json({ error: 'featured must be a boolean.' });

    const updated = await Project.findByIdAndUpdate(
      req.params.id, { featured }, { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Project not found.' });
    res.json({ _id: updated._id, featured: updated.featured });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * DELETE /api/projects/:id   [Protected]
 */
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found.' });
    res.json({ message: 'Project deleted successfully.', _id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
