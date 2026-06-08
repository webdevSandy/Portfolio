const express = require('express');
const multer  = require('multer');
const router  = express.Router();
const ctrl    = require('../controllers/upload.controller');
const auth    = require('../middleware/auth');

// Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// POST /api/upload
// Requires auth, uploads a single image under the field name 'file'
router.post('/', auth, upload.single('file'), ctrl.uploadImage);

module.exports = router;
