const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const registerRoutes = require('./routes');

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      'http://localhost:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// ─── Database ─────────────────────────────────────────────────────────────────
connectDB();

// ─── API Routes ───────────────────────────────────────────────────────────────
registerRoutes(app);

module.exports = app;
