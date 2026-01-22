// src/routes/posts.routes.js
const express = require('express');
const router = express.Router();

// 1. Import the controller
const postsController = require('../controllers/posts.controller');

// 2. Use the controller function
// Notice we don't use () after getAllPosts. We are passing the function itself.
router.get('/', postsController.getAllPosts);

module.exports = router;