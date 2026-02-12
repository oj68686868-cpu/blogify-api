import express from 'express';
import apiRoutes from './routes/index.js'; // Import the master router

const app = express();
const PORT = 3000;

// Global Middleware
app.use(express.json());

// Master Route Mounting
// All routes will be prefixed with /api/v1
app.use('/api/v1', apiRoutes);

// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Blogify API running on http://localhost:${PORT}`);
});