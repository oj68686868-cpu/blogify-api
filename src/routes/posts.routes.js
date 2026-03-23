// src/routes/posts.routes.js

const express = require('express');
const router = express.Router();
const { getAllPosts, createPost } = require('../controllers/posts.controller.js');

// GET /api/v1/posts
router.get('/', getAllPosts);

// POST /api/v1/posts
router.post('/', createPost);

module.exports = router;