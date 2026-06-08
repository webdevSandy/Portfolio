const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/contact.controller');

// POST /api/contact
router.post('/', ctrl.sendContactEmail);

module.exports = router;
