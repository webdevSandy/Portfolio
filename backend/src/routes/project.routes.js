const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/project.controller');
const auth    = require('../middleware/auth');

// GET  /api/projects           (query: ?featured=true &category= &status= &limit=)
router.get('/',    ctrl.getProjects);

// GET  /api/projects/:id
router.get('/:id', ctrl.getProjectById);

// POST /api/projects           [Protected]
router.post('/', auth, ctrl.createProject);

// PUT  /api/projects/:id       [Protected]
router.put('/:id', auth, ctrl.updateProject);

// PATCH /api/projects/:id/featured  [Protected]
router.patch('/:id/featured', auth, ctrl.toggleFeatured);

// DELETE /api/projects/:id     [Protected]
router.delete('/:id', auth, ctrl.deleteProject);

module.exports = router;
