const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  Connected to MongoDB Atlas');
    
    // Seed default admin immediately on database startup
    const { seedAdmin } = require('../controllers/auth.controller');
    await seedAdmin();
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
