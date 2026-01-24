
const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controller.js');

console.log("Controllers found:", postController); // <--- Add this line

router.get('/:postId', postController.getPostById);

// NEW: Route for a specific post using a parameter
// The ':postId' must match the key you use in req.params
router.get('/:postId', postController.getPostById);

module.exports = router;