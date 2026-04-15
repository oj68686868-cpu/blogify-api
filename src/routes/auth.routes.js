// src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const protect = require('../middleware/auth.middleware.js');
const { registerRules, loginRules, validate } = require('../middleware/validators.js');

// POST /api/v1/auth/register
router.post('/register', registerRules, validate, authController.registerUser);

// POST /api/v1/auth/login
router.post('/login', loginRules, validate, authController.loginUser);

// POST /api/v1/auth/refresh  — sends a new accessToken cookie
router.post('/refresh', authController.refreshAccessToken);

// POST /api/v1/auth/logout  — requires a valid accessToken to clear session
router.post('/logout', protect, authController.logoutUser);

module.exports = router;
