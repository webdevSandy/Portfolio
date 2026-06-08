const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email:            { type: String, required: true, unique: true },
  password:         { type: String, required: true },
  otp:              { type: String },
  otpExpires:       { type: Date },
  twoFactorEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.model('Admin', adminSchema);
