// src/index.js
const express = require('express');
const app = express();
const PORT = 3000;

// 1. Import the new router (The "Department")
const postRouter = require('./routes/posts.routes.js');

app.get('/', (req, res) => {
    res.send('Welcome to the Blogify API!');
});

// 2. Mount the router
// This tells Express: "Any request starting with /api/v1/posts goes to postRouter"
app.use('/api/v1/posts', postRouter);

// OLD CODE REMOVED:
// The app.get('/api/v1/posts'...) is gone. It lives in the router now.

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});