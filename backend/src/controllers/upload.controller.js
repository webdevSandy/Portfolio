const cloudinary = require('../config/cloudinary');

/**
 * Handles image uploading to Cloudinary.
 * Expects a file inside req.file (from multer).
 */
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please select a file to upload.' });
    }

    // Convert file buffer to base64 Data URI
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // Upload to Cloudinary under a separate custom folder
    const folderName = process.env.CLOUDINARY_FOLDER || 'sandy_portfolio';
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: folderName,
      resource_type: 'auto'
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({ error: err.message || 'Failed to upload image to Cloudinary.' });
  }
};
