const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/User');


// Follow Endpoint
// Follow Endpoint
router.post('/follow', async (req, res) => {
  const { username, follower } = req.body;

  try {
    // Add follower if not already present
    const user = await User.findOneAndUpdate(
      { username },
      { $addToSet: { followers: follower } },
      { new: true }
    );

    // Increment follower count of the user being followed
    await User.updateOne(
      { _id: user._id },
      { $inc: { followerCount: 1 } }
    );

    // Increment following count of the follower
    await User.updateOne(
      { username: follower },
      { $inc: { followingCount: 1 } }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Could not follow user' });
  }
});

// Unfollow Endpoint
router.post('/unfollow', async (req, res) => {
  const { username, follower } = req.body;

  try {
    // Remove follower
    const user = await User.findOneAndUpdate(
      { username },
      { $pull: { followers: follower } },
      { new: true }
    );

    // Decrement follower count of the user being unfollowed
    await User.updateOne(
      { _id: user._id },
      { $inc: { followerCount: -1 } }
    );

    // Decrement following count of the follower
    await User.updateOne(
      { username: follower },
      { $inc: { followingCount: -1 } }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Could not unfollow user' });
  }
});


module.exports = router;
