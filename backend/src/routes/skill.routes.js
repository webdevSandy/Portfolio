const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/skill.controller');
const auth    = require('../middleware/auth');

// GET  /api/skills
router.get('/',    ctrl.getSkills);

// GET  /api/skills/:id
router.get('/:id', ctrl.getSkillById);

// POST /api/skills             [Protected]
router.post('/', auth, ctrl.createSkill);

// PUT  /api/skills/:id         [Protected]
router.put('/:id', auth, ctrl.updateSkill);

// PATCH /api/skills/:id/items  [Protected]
router.patch('/:id/items', auth, ctrl.updateItems);

// DELETE /api/skills/:id       [Protected]
router.delete('/:id', auth, ctrl.deleteSkill);

module.exports = router;
