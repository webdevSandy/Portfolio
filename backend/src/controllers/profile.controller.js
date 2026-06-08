const Profile = require('../models/Profile');
const cloudinary = require('../config/cloudinary');

/**
 * GET /api/profile
 */
exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/profile   [Protected]
 */
exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    Object.assign(profile, req.body);
    await profile.save();

    // Automatically sync the Admin login email with the updated contactEmail
    if (req.body.contactEmail) {
      const Admin = require('../models/Admin');
      const admin = await Admin.findOne();
      if (admin && admin.email !== req.body.contactEmail) {
        admin.email = req.body.contactEmail;
        await admin.save();
        console.log('🔄 Synced Admin login email with Profile contactEmail:', req.body.contactEmail);
      }
    }

    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * POST /api/profile/resume   [Protected]
 * Uploads a resume document (PDF/Word) to Cloudinary and saves URL.
 */
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please select a resume file to upload.' });
    }

    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();

    // If an old resume exists on Cloudinary, delete it
    if (profile.resumePublicId) {
      try {
        await cloudinary.uploader.destroy(profile.resumePublicId, {
          resource_type: profile.resumeResourceType || 'raw'
        });
      } catch (destroyErr) {
        console.warn('Failed to delete old resume from Cloudinary:', destroyErr);
      }
    }

    // Convert file buffer to base64 Data URI
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // Upload to Cloudinary under folder 'sandy_portfolio'
    const folderName = process.env.CLOUDINARY_FOLDER || 'sandy_portfolio';
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: folderName,
      resource_type: 'auto',
      public_id: `resume_${Date.now()}`
    });

    profile.resumeUrl = result.secure_url;
    profile.resumePublicId = result.public_id;
    profile.resumeResourceType = result.resource_type;
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error('Resume upload error:', err);
    res.status(500).json({ error: err.message || 'Failed to upload resume.' });
  }
};

/**
 * DELETE /api/profile/resume   [Protected]
 * Deletes the resume from Cloudinary and clears DB fields.
 */
exports.deleteResume = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    if (profile.resumePublicId) {
      try {
        await cloudinary.uploader.destroy(profile.resumePublicId, {
          resource_type: profile.resumeResourceType || 'raw'
        });
      } catch (destroyErr) {
        console.warn('Failed to delete resume from Cloudinary:', destroyErr);
      }
    }

    profile.resumeUrl = '';
    profile.resumePublicId = '';
    profile.resumeResourceType = '';
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error('Resume delete error:', err);
    res.status(500).json({ error: err.message || 'Failed to delete resume.' });
  }
};
