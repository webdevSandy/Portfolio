const mongoose = require('mongoose');

const skillItemSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  value: { type: Number }
});

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [skillItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
