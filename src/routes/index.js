// src/routes/index.js

const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.routes.js');
const authRouter = require('./auth.routes.js');

// Health check
router.get('/health', (req, res) => {
    res.json({ success: true, message: 'Blogify API is running 🚀' });
});

// Mount routers
router.use('/posts', postsRouter);  // /api/v1/posts
router.use('/auth', authRouter);   // /api/v1/auth

module.exports = router;
