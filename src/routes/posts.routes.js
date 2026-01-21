// src/routes/posts.routes.js
const express = require('express');

// 1. Create a router instance (The "Mini-App")
const router = express.Router();

// 2. Define routes on the router
// Note: We use '/' because this router will be mounted at '/api/v1/posts' later.
// So, '/' here actually means '/api/v1/posts/' in the real world.
router.get('/', (req, res) => {
    res.send('Fetching all blog posts from the modular router!');
});

// 3. Export the router so index.js can use it
module.exports = router;