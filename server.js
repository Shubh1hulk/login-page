// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware to allow frontend requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Serve static files from public directory
app.use(express.static('public'));

// Define a simple route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// --- API Routes ---
app.use('/api/auth', require('./config/models/routes/authRoutes'));
// Example of a protected route
// app.use('/api/posts', require('./routes/postRoutes'));

// Simple admin route to view all users (for development only)
app.get('/api/admin/users', async (req, res) => {
  try {
    const User = require('./config/models/User');
    const users = await User.find({}).select('+password'); // Explicitly include password for admin view
    res.json({ 
      count: users.length,
      users: users 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin route to clear all users (for development only)
app.delete('/api/admin/clear-users', async (req, res) => {
  try {
    const User = require('./config/models/User');
    const result = await User.deleteMany({});
    res.json({ 
      message: 'All users deleted successfully',
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


const PORT = process.env.PORT || 5000;

// Export the app for Vercel
module.exports = app;

// Only start server if not in Vercel environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
