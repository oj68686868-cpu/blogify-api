// src/controllers/auth.controller.js

const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
    // 1. Check for validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    try {
        const { username, email, password } = req.body;

        // 2. Check if a user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // 409 Conflict — duplicate resource
            return res.status(409).json({
                success: false,
                error: { message: 'A user with this email already exists.' },
            });
        }

        // 3. Hash the password — bcrypt handles salt generation automatically
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Create the user — NEVER store the plain-text password
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // 5. Return 201 Created — omit the password from the response
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        // Pass unexpected errors to the global error handler
        next(error);
    }
};

/**
 * @desc    TEMPORARY — Practice generating a signed JWT
 * @route   GET /api/v1/auth/practice-token
 * @access  Public (remove this route after the activity)
 */
const practiceTokenGeneration = (req, res) => {
    // 1. Pretend we just looked up a user from the database
    const mockUser = {
        _id: '654a5b8f1c3d4e5f6a7b8c9d',
        username: 'testuser',
        role: 'user',
    };

    // 2. Build the payload — only non-sensitive identifiers go here!
    const payload = {
        id: mockUser._id,
        username: mockUser.username,
    };

    // 3. Read the secret from the environment (NEVER hard-code this!)
    const secretKey = process.env.JWT_SECRET;

    // 4. Configure token options
    const options = {
        expiresIn: '1h', // Token expires in 1 hour
    };

    // 5. Sign and create the token
    const token = jwt.sign(payload, secretKey, options);

    // 6. Return it so we can inspect it on jwt.io
    res.status(200).json({
        message: 'Token generated for practice! Paste the token into jwt.io to inspect it.',
        token,
    });
};

module.exports = {
    registerUser,
    practiceTokenGeneration, // Temporary export for JWT practice activity
};
