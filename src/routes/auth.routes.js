// src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller.js');

// Validation rules for user registration
const registrationRules = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .trim(),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// POST /api/v1/auth/register
router.post('/register', registrationRules, authController.registerUser);

// GET /api/v1/auth/practice-token  ← TEMPORARY: Remove after JWT activity
router.get('/practice-token', authController.practiceTokenGeneration);

module.exports = router;
