const express = require('express');
const multer  = require('multer');
const router  = express.Router();
const ctrl    = require('../controllers/profile.controller');
const auth    = require('../middleware/auth');

// Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// GET  /api/profile
router.get('/', ctrl.getProfile);

// PUT  /api/profile   [Protected]
router.put('/', auth, ctrl.updateProfile);

// POST /api/profile/resume   [Protected]
router.post('/resume', auth, upload.single('file'), ctrl.uploadResume);

// DELETE /api/profile/resume   [Protected]
router.delete('/resume', auth, ctrl.deleteResume);

module.exports = router;
