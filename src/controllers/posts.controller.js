// This file handles the LOGIC
// We simulate a database with a simple array for now
let posts = [
  { id: 1, title: "My First Blog", content: "Hello World!" },
  { id: 2, title: "MVC Pattern", content: "Separation of concerns is cool." }
];

export const getAllPosts = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    data: posts
  });
};

export const createPost = (req, res) => {
  const newPost = {
    id: posts.length + 1,
    ...req.body
  };
  posts.push(newPost);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: newPost
  });
};