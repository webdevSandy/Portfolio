const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const registerRoutes = require('./routes');

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// ─── Database ─────────────────────────────────────────────────────────────────
connectDB();

// ─── API Routes ───────────────────────────────────────────────────────────────
registerRoutes(app);

module.exports = app;
