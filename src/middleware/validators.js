// src/middleware/validators.js
// Centralised validation rules (AI-generated, manually audited)
// Regex tested on https://regex101.com before deployment

const { body, validationResult } = require('express-validator');

// ── Registration Rules ──────────────────────────────────────────────────────
const registerRules = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        // Positive lookahead: at least one uppercase letter
        .matches(/(?=.*[A-Z])/)
        .withMessage('Password must contain at least one uppercase letter')
        // At least one digit
        .matches(/(?=.*[0-9])/)
        .withMessage('Password must contain at least one number')
        // At least one special character from the allowed set
        .matches(/(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one special character (!@#$%^&*)'),
];

// ── Login Rules ──────────────────────────────────────────────────────────────
const loginRules = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

// ── Change Password Rules ────────────────────────────────────────────────────
// Activity: AI-generated, audited by developer
// (?=.*[A-Z])  → at least one uppercase letter
// (?=.*[0-9])  → at least one digit
// (?=.*[!@#$%^&*]) → at least one special character
// Tested: "password123" → FAIL ✓  |  "Pass@1234" → PASS ✓
const changePasswordRules = [
    body('oldPassword')
        .notEmpty()
        .withMessage('Old password is required'),

    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters')
        .matches(/(?=.*[A-Z])/)
        .withMessage('New password must contain at least one uppercase letter')
        .matches(/(?=.*[0-9])/)
        .withMessage('New password must contain at least one number')
        .matches(/(?=.*[!@#$%^&*])/)
        .withMessage('New password must contain at least one special character (!@#$%^&*)'),
];

// ── Validation Result Checker ────────────────────────────────────────────────
// Chain this AFTER any rule array; returns 400 if validation fails
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({
        success: false,
        errors: errors.array(),
    });
};

module.exports = {
    registerRules,
    loginRules,
    changePasswordRules,
    validate,
};
