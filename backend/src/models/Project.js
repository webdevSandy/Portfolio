const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  desc:     { type: String, required: true },
  image:    { type: String, required: true },
  images:   [{ type: String }],
  demo:     { type: String, default: '' },
  code:     { type: String, default: '' },
  tech:     [{ type: String }],
  category: { type: String, default: 'Web' },
  featured: { type: Boolean, default: false },
  order:    { type: Number,  default: 0 },
  status:   { type: String, enum: ['live', 'wip', 'archived'], default: 'live' }
}, { timestamps: true });

projectSchema.index({ featured: -1, order: 1 });

module.exports = mongoose.model('Project', projectSchema);
