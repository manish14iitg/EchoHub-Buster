require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins (for development)
app.use(express.json()); // Enable parsing of JSON request bodies

// API Routes
app.use('/api', newsRoutes); // All news-related routes will be under /api

// Basic endpoint for server status check
app.get('/', (req, res) => {
  res.send('EchoHub Buster Backend is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});