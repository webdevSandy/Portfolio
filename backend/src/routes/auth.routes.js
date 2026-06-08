const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/auth.controller');
const auth    = require('../middleware/auth');

// POST /api/auth/login - standard login
router.post('/login', ctrl.login);

// POST /api/auth/verify-otp - 2FA code verification
router.post('/verify-otp', ctrl.verifyOtp);

// POST /api/auth/request-password-otp [Protected] - request OTP to change password
router.post('/request-password-otp', auth, ctrl.requestPasswordOtp);

// POST /api/auth/change-password [Protected] - submit password change
router.post('/change-password', auth, ctrl.changePassword);

// GET /api/auth/2fa [Protected] - get 2FA status
router.get('/2fa', auth, ctrl.get2FAStatus);

// PUT /api/auth/2fa [Protected] - toggle 2FA switch
router.put('/2fa', auth, ctrl.toggle2FA);

module.exports = router;
