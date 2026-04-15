// src/controllers/auth.controller.js

const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Generate a signed JWT
 * @param {object} payload   - Data to encode (id, username)
 * @param {string} secret    - JWT signing secret
 * @param {string} expiresIn - e.g. '15m' | '7d'
 */
const generateToken = (payload, secret, expiresIn) =>
    jwt.sign(payload, secret, { expiresIn });

/** Build the cookie options object */
const cookieOptions = (maxAgeMs) => ({
    httpOnly: true,                                          // JS cannot read this
    secure: process.env.NODE_ENV === 'production',           // HTTPS only in prod
    sameSite: 'strict',                                      // CSRF protection
    maxAge: maxAgeMs,
});

// ── Register ─────────────────────────────────────────────────────────────────

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: { message: 'A user with this email already exists.' },
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

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
        next(error);
    }
};

// ── Login ─────────────────────────────────────────────────────────────────────

/**
 * @desc    Log in — issues accessToken (15m) + refreshToken (7d) as HttpOnly cookies
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Find user (include password for comparison)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // 2. Compare plain-text password against stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // 3. Build token payload (never put sensitive data here)
        const tokenPayload = { id: user._id, username: user.username };

        // 4. Generate tokens
        const accessToken = generateToken(tokenPayload, process.env.JWT_SECRET, '15m');
        const refreshToken = generateToken(tokenPayload, process.env.REFRESH_TOKEN_SECRET, '7d');

        // 5. Persist refresh token in DB (enables revocation)
        user.refreshToken = refreshToken;
        await user.save();

        // 6. Send both tokens as secure HttpOnly cookies
        res
            .status(200)
            .cookie('accessToken', accessToken, cookieOptions(15 * 60 * 1000))    // 15 minutes
            .cookie('refreshToken', refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000)) // 7 days
            .json({
                success: true,
                message: 'Logged in successfully.',
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
    } catch (error) {
        next(error);
    }
};

// ── Refresh Access Token ──────────────────────────────────────────────────────

/**
 * @desc    Issue a new accessToken using a valid refreshToken cookie
 * @route   POST /api/v1/auth/refresh
 * @access  Public (requires refreshToken cookie)
 */
const refreshAccessToken = async (req, res, next) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: 'No refresh token provided',
            });
        }

        // 1. Verify refresh token signature
        let decoded;
        try {
            decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired refresh token, please log in again',
            });
        }

        // 2. Look up user and check that the stored token matches (revocation check)
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token has been revoked, please log in again',
            });
        }

        // 3. Issue a fresh access token
        const newAccessToken = generateToken(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            '15m'
        );

        res
            .status(200)
            .cookie('accessToken', newAccessToken, cookieOptions(15 * 60 * 1000))
            .json({
                success: true,
                message: 'Access token refreshed successfully.',
            });
    } catch (error) {
        next(error);
    }
};

// ── Logout ────────────────────────────────────────────────────────────────────

/**
 * @desc    Log out — clear cookies and revoke refresh token in DB (kill switch)
 * @route   POST /api/v1/auth/logout
 * @access  Protected
 */
const logoutUser = async (req, res, next) => {
    try {
        // Revoke the refresh token in DB so the hacker cannot get new access tokens
        if (req.user && req.user.id) {
            await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
        }

        const clearOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        };

        res
            .status(200)
            .clearCookie('accessToken', clearOptions)
            .clearCookie('refreshToken', clearOptions)
            .json({
                success: true,
                message: 'Logged out successfully.',
            });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
};
