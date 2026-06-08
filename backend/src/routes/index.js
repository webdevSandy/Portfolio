const authRoutes       = require('./auth.routes');
const profileRoutes    = require('./profile.routes');
const projectRoutes    = require('./project.routes');
const skillRoutes      = require('./skill.routes');
const experienceRoutes = require('./experience.routes');
const uploadRoutes     = require('./upload.routes');
const contactRoutes    = require('./contact.routes');

/**
 * Registers all API routes on the given Express app.
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.use('/api/auth',       authRoutes);
  app.use('/api/profile',    profileRoutes);
  app.use('/api/projects',   projectRoutes);
  app.use('/api/skills',     skillRoutes);
  app.use('/api/experience', experienceRoutes);
  app.use('/api/upload',     uploadRoutes);
  app.use('/api/contact',    contactRoutes);

  // 404 catch-all for unmatched API routes
  app.use('/api', (req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
  });
};
