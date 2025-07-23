// controllers/authController.js

const User = require('../../User');
const jwt = require('jsonwebtoken');

// --- Utility Function to Generate JWT ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


// --- Controller for User Registration ---
// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Registration attempt:', { name, email, password: '***' });

  try {
    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create a new user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password,
    });

    console.log('User created successfully:', user._id);

    // 3. Respond with token if user is created successfully
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// --- Controller for User Login ---
// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if email and password is provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }
      
    // 2. Check for user by email
    const user = await User.findOne({ email }).select('+password'); // Explicitly include password

    // 3. Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// --- Controller to Get User Profile ---
// @desc    Get user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    // The user object is attached to req in the protect middleware
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
};
