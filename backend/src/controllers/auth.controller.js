const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

/**
 * Helper function to seed admin credentials if no admin exists.
 * Automatically handles stale database entries.
 */
exports.seedAdmin = async () => {
  const Profile = require('../models/Profile');
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await new Profile({
      name: 'Sandy Chaudhary',
      title: 'Creative Web Developer',
      tagline: 'Building products with love and code.',
      bio: 'Highly motivated web developer focused on creating premium digital experiences.',
      contactEmail: 'developer.sandychaudhary@gmail.com'
    }).save();
    console.log('🌱 Seeded default Profile with contactEmail:', profile.contactEmail);
  }

  const loginEmail = profile.contactEmail;

  let admin = await Admin.findOne();
  if (!admin) {
    const password = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);
    await new Admin({
      email: loginEmail,
      password: hashedPassword,
      twoFactorEnabled: false
    }).save();
    console.log('🌱 Seeded default admin account in Database:', loginEmail);
  } else {
    // Sync email with Profile contactEmail on startup
    if (admin.email !== profile.contactEmail) {
      admin.email = profile.contactEmail;
      await admin.save();
      console.log('🔄 Synced existing Admin email with Profile contactEmail on startup:', profile.contactEmail);
    }
    if (!admin.password) {
      admin.password = await bcrypt.hash('admin', 10);
      await admin.save();
      console.log('🌱 Updated existing stale admin document with default password ("admin").');
    }
  }
};

/**
 * POST /api/auth/login
 * Standard username/password login. Handles 2FA triggering.
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Seed admin credentials if not already present
    await exports.seedAdmin();

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare entered password with hashed database password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // If 2FA is not enabled, log in immediately
    if (!admin.twoFactorEnabled) {
      const token = jwt.sign({ email: admin.email, id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, message: 'Authenticated successfully.' });
    }

    // If 2FA is enabled, generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
    await admin.save();

    // Send OTP to developer.sandychaudhary@gmail.com
    const targetEmail = 'developer.sandychaudhary@gmail.com';
    const { data, error } = await resend.emails.send({
      from: 'Security Team <onboarding@resend.dev>',
      to: targetEmail,
      subject: '🔐 Your 2FA Login Verification Code',
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
          <h2 style="color: #10b981; text-align: center;">2FA Security Verification</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px; line-height: 1.5;">To complete your login, please enter the following 6-digit verification code on the login screen:</p>
          <div style="background-color: #f3f4f6; text-align: center; padding: 15px; font-size: 28px; font-weight: bold; letter-spacing: 4px; border-radius: 6px; margin: 20px 0; color: #111;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #888;">This code is valid for 5 minutes. If you did not request this code, please secure your account immediately.</p>
        </div>
      `
    });

    if (error) {
      console.error('2FA Send Error:', error);
      return res.status(400).json({ error: 'Failed to send OTP email: ' + error.message });
    }

    res.json({
      twoFactorRequired: true,
      email: targetEmail,
      message: 'Two-factor authentication code sent to your email.'
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/auth/verify-otp
 * Verifies the 2FA OTP code and returns the JWT.
 */
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required.' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    // Verify OTP and expiration
    if (admin.otp !== otp || admin.otpExpires < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired verification code.' });
    }

    // Clear OTP details
    admin.otp = undefined;
    admin.otpExpires = undefined;
    await admin.save();

    // Generate token
    const token = jwt.sign({ email: admin.email, id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, message: 'Authenticated successfully via 2FA.' });

  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/auth/request-password-otp [Protected]
 * Triggers OTP to change the password.
 */
exports.requestPasswordOtp = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await admin.save();

    const targetEmail = 'developer.sandychaudhary@gmail.com';
    const { data, error } = await resend.emails.send({
      from: 'Security Team <onboarding@resend.dev>',
      to: targetEmail,
      subject: '🔑 Verification Code to Change Password',
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
          <h2 style="color: #10b981; text-align: center;">Change Password Verification</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px; line-height: 1.5;">You requested to change your admin password. Please enter the following 6-digit verification code in your security dashboard:</p>
          <div style="background-color: #f3f4f6; text-align: center; padding: 15px; font-size: 28px; font-weight: bold; letter-spacing: 4px; border-radius: 6px; margin: 20px 0; color: #111;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #888;">This code is valid for 5 minutes. If you did not make this request, please change your credentials immediately.</p>
        </div>
      `
    });

    if (error) {
      console.error('Password OTP Send Error:', error);
      return res.status(400).json({ error: 'Failed to send OTP: ' + error.message });
    }

    res.json({ message: 'Verification code sent to ' + targetEmail });

  } catch (err) {
    console.error('Request password OTP error:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/auth/change-password [Protected]
 * Updates password using validated OTP.
 */
exports.changePassword = async (req, res) => {
  const { otp, newPassword, confirmPassword } = req.body;

  if (!otp || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'All fields (otp, newPassword, confirmPassword) are required.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New password and confirm password do not match.' });
  }

  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    // Verify OTP
    if (admin.otp !== otp || admin.otpExpires < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired verification code.' });
    }

    // Hash and save new password
    admin.password = await bcrypt.hash(newPassword, 10);
    admin.otp = undefined;
    admin.otpExpires = undefined;
    await admin.save();

    res.json({ message: 'Password updated successfully!' });

  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/auth/status [Protected]
 * Checks dynamic 2FA status.
 */
exports.get2FAStatus = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found.' });
    res.json({ twoFactorEnabled: admin.twoFactorEnabled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/auth/2fa [Protected]
 * Toggles 2FA status.
 */
exports.toggle2FA = async (req, res) => {
  const { enabled } = req.body;

  if (typeof enabled !== 'boolean') {
    return res.status(400).json({ error: 'enabled must be a boolean.' });
  }

  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found.' });

    admin.twoFactorEnabled = enabled;
    await admin.save();

    res.json({ twoFactorEnabled: admin.twoFactorEnabled, message: `2FA turned ${enabled ? 'ON' : 'OFF'} successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
