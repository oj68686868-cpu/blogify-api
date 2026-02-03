// src/controllers/posts.controller.js

const getAllPosts = (req, res) => {
  // 1. Logic: In a real app, you would fetch from DB. Here is mock data.
  const posts = [
    { id: 1, title: "Learning Node.js", content: "Node.js is cool!" },
    { id: 2, title: "Refactoring APIs", content: "Structure matters." }
  ];

  // 2. Response: Status 200 + Standard JSON Envelope
  res.status(200).json({
    success: true,
    data: posts, // We send the actual array of data here
    message: "All posts fetched successfully" // Optional helpful message
  });
};

const getPostById = (req, res) => {
  const { id } = req.params;

  // 1. Logic: Find the post (mock logic)
  // Note: req.params.id is a string, so we just echo it back for now
  
  // 2. Response: Status 200 + Standard JSON Envelope
  res.status(200).json({
    success: true,
    data: { 
        id: id,
        title: "Mock Post Title",
        content: "This is a placeholder for post " + id 
    }
  });
};

// IMPORTANT: We only export the functions. 
// We do NOT use 'router.get' here. That belongs in the routes file.
module.exports = {
  getAllPosts,
  getPostById,
};