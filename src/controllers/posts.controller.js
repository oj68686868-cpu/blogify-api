
const getPostById = async (req, res) => {
    // 1. Capture the 'postId' from the URL parameters
    const { postId } = req.params;

    // 2. Send back a confirmation response
    res.status(200).json({
        message: `Fetching data for post with ID: ${postId}`
    });
};

module.exports = {
    // ... your other controllers like getAllPosts
    getPostById
};