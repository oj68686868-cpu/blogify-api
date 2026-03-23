// src/controllers/posts.controller.js

const Post = require('../models/posts.model.js');

/**
 * @desc    Get all posts
 * @route   GET /api/v1/posts
 * @access  Public
 */
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Posts fetched successfully',
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new post
 * @route   POST /api/v1/posts
 * @access  Public
 */
const createPost = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    const post = await Post.create({ title, content, author });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPosts, createPost };