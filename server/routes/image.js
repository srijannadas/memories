// routes/image.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');
const User = require('../models/User');

// Multer storage configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Image upload route
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const userId = req.userId;
    const { filename } = req.file;

    // Save the image to the database
    const user = await User.findById(userId);
    const newImage = new Image({
      user: userId,
      filename: filename,
    });
    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', });
  }
});

router.get('/fetch', verifyToken, async (req, res) => {
    try {
      const userId = req.userId;
  
      // Fetch images for the authenticated user
      const userImages = await Image.find({ user: userId }, 'filename');
      res.status(200).json({ images: userImages });
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/fetch-all', async (req, res) => {
    try {
      // Fetch all images from the database
      const allImages = await Image.find({}, 'filename');
  
      res.status(200).json({ images: allImages });
    } catch (error) {
      console.error('Error fetching all images:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// ... (other image-related routes)

module.exports = router;
