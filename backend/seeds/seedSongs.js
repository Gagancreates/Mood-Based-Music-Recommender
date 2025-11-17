const mongoose = require('mongoose');
require('dotenv').config();
const Song = require('../models/Song');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mood-music-db';

// Sample songs data
const songs = [
  // Happy songs
  {
    title: 'Sunshine Vibes',
    artist: 'The Happy Bunch',
    mood: 'happy',
    audioUrl: 'http://localhost:5000/audio/happy1.mp3',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    title: 'Good Times Roll',
    artist: 'Joyful Hearts',
    mood: 'happy',
    audioUrl: 'http://localhost:5000/audio/happy2.mp3',
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop'
  },
  {
    title: 'Dancing in the Light',
    artist: 'Bright Days',
    mood: 'happy',
    audioUrl: 'http://localhost:5000/audio/happy3.mp3',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  },

  // Sad songs
  {
    title: 'Rainy Days',
    artist: 'Melancholy Souls',
    mood: 'sad',
    audioUrl: 'http://localhost:5000/audio/sad1.mp3',
    albumArt: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300&h=300&fit=crop'
  },
  {
    title: 'Tears in the Ocean',
    artist: 'Blue Memories',
    mood: 'sad',
    audioUrl: 'http://localhost:5000/audio/sad2.mp3',
    albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop'
  },
  {
    title: 'Lonely Nights',
    artist: 'Echo Chamber',
    mood: 'sad',
    audioUrl: 'http://localhost:5000/audio/sad3.mp3',
    albumArt: 'https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=300&h=300&fit=crop'
  },

  // Energetic songs
  {
    title: 'Power Rush',
    artist: 'Electric Thunder',
    mood: 'energetic',
    audioUrl: 'http://localhost:5000/audio/energetic1.mp3',
    albumArt: 'https://images.unsplash.com/photo-1571609704276-b41c06d84f59?w=300&h=300&fit=crop'
  },
  {
    title: 'Adrenaline Surge',
    artist: 'High Voltage',
    mood: 'energetic',
    audioUrl: 'http://localhost:5000/audio/energetic2.mp3',
    albumArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop'
  },
  {
    title: 'Unstoppable',
    artist: 'Maximum Force',
    mood: 'energetic',
    audioUrl: 'http://localhost:5000/audio/energetic3.mp3',
    albumArt: 'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?w=300&h=300&fit=crop'
  },

  // Romantic songs
  {
    title: 'Love in Bloom',
    artist: 'Sweet Serenade',
    mood: 'romantic',
    audioUrl: 'http://localhost:5000/audio/romantic1.mp3',
    albumArt: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop'
  },
  {
    title: 'Heart to Heart',
    artist: 'Tender Moments',
    mood: 'romantic',
    audioUrl: 'http://localhost:5000/audio/romantic2.mp3',
    albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop'
  },
  {
    title: 'Forever Yours',
    artist: 'Love Letters',
    mood: 'romantic',
    audioUrl: 'http://localhost:5000/audio/romantic3.mp3',
    albumArt: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing songs
    console.log('Clearing existing songs...');
    await Song.deleteMany({});
    console.log('✅ Cleared existing songs');

    // Insert new songs
    console.log('Inserting new songs...');
    await Song.insertMany(songs);
    console.log(`✅ Successfully seeded ${songs.length} songs`);

    // Display summary
    const moodCounts = await Song.aggregate([
      { $group: { _id: '$mood', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📊 Songs by mood:');
    moodCounts.forEach(({ _id, count }) => {
      console.log(`   ${_id}: ${count} songs`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
