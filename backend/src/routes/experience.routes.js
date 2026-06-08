const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/experience.controller');
const auth    = require('../middleware/auth');

// GET  /api/experience
router.get('/', ctrl.getExperiences);

// POST /api/experience         [Protected]
router.post('/', auth, ctrl.createExperience);

// PUT  /api/experience/:id     [Protected]
router.put('/:id', auth, ctrl.updateExperience);

// DELETE /api/experience/:id   [Protected]
router.delete('/:id', auth, ctrl.deleteExperience);

module.exports = router;
