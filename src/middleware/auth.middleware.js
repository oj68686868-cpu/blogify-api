// src/middleware/auth.middleware.js
// The Gatekeeper — reads the access token cookie and populates req.user

const jwt = require('jsonwebtoken');

/**
 * @desc   Protect routes — verifies the accessToken cookie (or Bearer header fallback)
 * @usage  router.post('/posts', protect, createPost)
 */
const protect = (req, res, next) => {
    let token;

    // 1. Preferred: read from HttpOnly cookie
    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }
    // 2. Fallback: Authorization: Bearer <token> header (Postman / mobile clients)
    else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    // 3. No token found anywhere — reject immediately
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token',
        });
    }

    try {
        // 4. Verify signature + expiry
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Attach decoded payload to request so controllers know who is calling
        req.user = decoded; // { id, username, iat, exp }
        next();
    } catch (err) {
        // Token is expired, tampered, or otherwise invalid
        const message =
            err.name === 'TokenExpiredError'
                ? 'Session expired, please log in again'
                : 'Not authorized, invalid token';

        return res.status(401).json({ success: false, message });
    }
};

module.exports = protect;
