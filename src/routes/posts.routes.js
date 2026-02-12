import express from 'express';
import { getAllPosts, createPost } from '../controllers/posts.controller.js';

const router = express.Router();

// Define routes relative to /posts
router.get('/', getAllPosts);
router.post('/', createPost);

export default router;