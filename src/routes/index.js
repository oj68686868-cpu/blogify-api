import express from 'express';
import postRoutes from './posts.routes.js';

const router = express.Router();

// Mount the posts routes under /posts
// This effectively creates /api/v1/posts
router.use('/posts', postRoutes);

export default router;