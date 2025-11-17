const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Get all songs by mood
router.get('/mood/:mood', async (req, res) => {
  try {
    const { mood } = req.params;

    // Validate mood
    const validMoods = ['happy', 'sad', 'romantic', 'energetic'];
    if (!validMoods.includes(mood.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid mood. Choose from: happy, sad, romantic, energetic'
      });
    }

    const songs = await Song.find({ mood: mood.toLowerCase() }).sort({ createdAt: -1 });

    res.json({
      mood: mood.toLowerCase(),
      count: songs.length,
      songs
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// Get all songs (optional - for testing)
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().sort({ mood: 1, createdAt: -1 });
    res.json({
      count: songs.length,
      songs
    });
  } catch (error) {
    console.error('Error fetching all songs:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

module.exports = router;
