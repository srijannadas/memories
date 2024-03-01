// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Image = require('../models/Image');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    
    // Generate and send a token
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate and send a token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET a specific user by ID
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    console.log(req.params);
    const user = await User.findOne({ username: { $regex: new RegExp('^' + username + '$', 'i') } }, 'username email');
    console.log('Username parameter:', username);

    if (!user) {
      return res.status(404).json({ message: `User with username '${username}' not found` });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:username/images', async (req, res) => {

  try {
    const { username } = req.params;
    // Fetch user by username and get their images
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch user images based on user ID
    const userImages = await Image.find({ user: user._id }, 'filename');
    res.status(200).json({ images: userImages });
  } catch (error) {
    console.error('Error fetching user images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
    })

module.exports = router;
