const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'romantic', 'energetic'],
    lowercase: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  albumArt: {
    type: String,
    default: 'https://via.placeholder.com/300x300/6366f1/ffffff?text=Music'
  }
}, {
  timestamps: true
});

// Index for faster mood queries
songSchema.index({ mood: 1 });

module.exports = mongoose.model('Song', songSchema);
