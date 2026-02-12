const requestLogger = (req, res, next) => {
    // FIX 1: Added backticks for template literal
    console.log(`Request Received: ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = requestLogger;