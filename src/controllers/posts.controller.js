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
 * @desc    Get a single post by ID
 * @route   GET /api/v1/posts/:id
 * @access  Public
 */
const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username email');

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new post (author set from JWT — no body injection possible)
 * @route   POST /api/v1/posts
 * @access  Protected
 */
const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        // Author comes from the middleware, NOT the request body
        const post = await Post.create({ title, content, author: req.user.id });

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a post (only the owner can update)
 * @route   PUT /api/v1/posts/:id
 * @access  Protected
 */
const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Authorization — compare ObjectId strings
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to perform this action',
            });
        }

        const { title, content } = req.body;
        post.title = title ?? post.title;
        post.content = content ?? post.content;
        await post.save();

        res.status(200).json({ success: true, message: 'Post updated successfully', data: post });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a post (only the owner can delete)
 * @route   DELETE /api/v1/posts/:id
 * @access  Protected
 */
const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Authorization — 403 if requester is not the author
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to perform this action',
            });
        }

        await post.deleteOne();

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
