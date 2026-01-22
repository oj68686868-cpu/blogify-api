// src/controllers/posts.controller.js

// This function handles the logic for fetching posts
const getAllPosts = (req, res) => {
    res.send('Fetching all blog posts from the modular router!');
};

// We export it as an object so we can add more functions later (like createPost)
module.exports = {
    getAllPosts,
};