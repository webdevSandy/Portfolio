const { Resend } = require('resend');
const Profile    = require('../models/Profile');

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

/**
 * POST /api/contact
 * Handles sending contact form details to the admin's email using Resend.
 */
exports.sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
  }

  try {
    // Dynamically retrieve receiving email from Profile settings in Database
    const profile = await Profile.findOne();
    const adminEmail = profile?.contactEmail || process.env.ADMIN_EMAIL || 'admin@example.com';

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: adminEmail,
      subject: `📧 Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; rounded: 10px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p style="font-size: 16px; margin-top: 20px;">You have received a new message from your portfolio website:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #555;">Name:</td>
              <td style="padding: 8px 0; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 8px 0; color: #111;">${subject}</td>
            </tr>
          </table>

          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #10b981; border-radius: 4px; margin-top: 20px;">
            <p style="font-weight: bold; margin-top: 0; color: #333;">Message:</p>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #444; margin-bottom: 0;">${message}</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888; text-align: center;">This email was sent automatically from your Portfolio contact form.</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend email error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Message sent successfully!', data });
  } catch (err) {
    console.error('Email controller error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
};
