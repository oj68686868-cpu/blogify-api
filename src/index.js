// src/index.js — Main Express application entry point

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('../config/db.js');
const apiRoutes = require('./routes/index.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Connect to MongoDB ─────────────────────────────────────────────────────
connectDB();

// ─── Global Middleware ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // CRITICAL — must be after express.json, before routes

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/v1', apiRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Blogify API running at http://localhost:${PORT}`);
    console.log(`📖 Health check: http://localhost:${PORT}/api/v1/health\n`);
});