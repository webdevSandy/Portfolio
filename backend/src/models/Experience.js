const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role:    { type: String, required: true },
  company: { type: String, required: true },
  date:    { type: String, required: true },
  desc:    { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
