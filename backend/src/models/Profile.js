const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name:        { type: String, required: true, default: 'Your Name' },
  title:       { type: String, required: true, default: 'Frontend Developer' },
  tagline:     { type: String, default: 'I build things for the web.' },
  bio:         { type: String, default: 'Creative developer and UI/UX enthusiast.' },
  contactEmail:{ type: String, default: 'hello@example.com' },
  githubUrl:   { type: String, default: 'https://github.com' },
  linkedinUrl: { type: String, default: 'https://linkedin.com' },
  avatarUrl:   { type: String, default: '' },
  resumeUrl:   { type: String, default: '' },
  resumePublicId: { type: String, default: '' },
  resumeResourceType: { type: String, default: '' },
  typewriterTitles: { 
    type: [String], 
    default: ['Frontend Developer.', 'UI/UX Enthusiast.', 'Creative Coder.'] 
  }
});

module.exports = mongoose.model('Profile', profileSchema);
