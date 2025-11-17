const mongoose = require('mongoose');
require('dotenv').config();
const Song = require('../models/Song');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mood-music-db';

// Sample songs data
const songs = [

  // Happy songs

  {
    title: 'Dancin - Krono Remix',
    artist: 'Aaron Smith',
    mood: 'happy',

    audioUrl: 'http://localhost:5000/audio/happy1.mp3',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  },

  {
    title: 'Last Bench Party',
    artist: 'Kirik Party',
    mood: 'happy',

    audioUrl: 'http://localhost:5000/audio/happy2.mp3',

    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop'

  },

  {
    title: 'The Days',
    artist: 'Chrystal',
    mood: 'happy',

    audioUrl: 'http://localhost:5000/audio/happy3.mp3',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    title: 'The way you make me Feel',
    artist: 'Michael Jackson',
    mood: 'happy',
    audioUrl: 'http://localhost:5000/audio/happy4.mp3',
    albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop'
  },
  {
    title: 'Cant Hold Me Down',
    artist: 'Doodles',
    mood: 'happy',
    audioUrl: 'http://localhost:5000/audio/happy5.mp3',
    albumArt: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop'
  },

 

  // Sad songs

  {
    title: 'Pain',
    artist: 'Josh A',
    mood: 'sad',

    audioUrl: 'http://localhost:5000/audio/sad1.mp3',

    albumArt: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300&h=300&fit=crop'

  },

  {
    title: 'Two Moons',
    artist: 'BoyWithUke',
    mood: 'sad',

    audioUrl: 'http://localhost:5000/audio/sad2.mp3',
    albumArt: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=300&fit=crop'
  },

  {
    title: 'Kaagadada Doniyalli',
    artist: 'Vasuki Vaibhav',
    mood: 'sad',

    audioUrl: 'http://localhost:5000/audio/sad3.mp3',
    albumArt: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop'
  },
  {
    title: 'No Surprise',
    artist: 'Radio Head',
    mood: 'sad',
    audioUrl: 'http://localhost:5000/audio/sad4.mp3',
    albumArt: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=300&h=300&fit=crop'
  },
  {
    title: 'Older',
    artist: 'Alec Benjamin',
    mood: 'sad',
    audioUrl: 'http://localhost:5000/audio/sad5.mp3',
    albumArt: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=300&h=300&fit=crop'
  },

 

  // Energetic songs

  {
    title: '768 - Remix',
    artist: 'K-P',
    mood: 'energetic',

    audioUrl: 'http://localhost:5000/audio/energetic1.mp3',

    albumArt: 'https://images.unsplash.com/photo-1571609704276-b41c06d84f59?w=300&h=300&fit=crop'

  },

  {
    title: 'Metamorphosis',
    artist: 'INTERWORLD',
    mood: 'energetic',

    audioUrl: 'http://localhost:5000/audio/energetic2.mp3',

    albumArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop'

  },

  {
    title: 'midnight sun',
    artist: 'zoid land',
    mood: 'energetic',

    audioUrl: 'http://localhost:5000/audio/energetic3.mp3',

    albumArt: 'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?w=300&h=300&fit=crop'

  },

  {

    title: 'RAPTURE',

    artist: 'INTEROWORLD',

    mood: 'energetic',

    audioUrl: 'http://localhost:5000/audio/energetic4.mp3',

    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'

  },

  {

    title: 'Suffer With Me',

    artist: 'Ilue',

    mood: 'energetic',

    audioUrl: 'http://localhost:5000/audio/energetic5.mp3',

    albumArt: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&h=300&fit=crop'

  },
  {
    title: 'RAPTURE',
    artist: 'INTEROWORLD',
    mood: 'energetic',
    audioUrl: 'http://localhost:5000/audio/energetic4.mp3',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  },
  {
    title: 'Suffer With Me',
    artist: 'Ilue',
    mood: 'energetic',
    audioUrl: 'http://localhost:5000/audio/energetic5.mp3',
    albumArt: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&h=300&fit=crop'
  },

 

  // Romantic songs

  {
    title: 'The Ronettes',
    artist: 'The RonettesVevo',
    mood: 'romantic',

    audioUrl: 'http://localhost:5000/audio/romantic1.mp3',

    albumArt: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop'

  },

  {
    title: 'For the first time',
    artist: 'Mac DeMarco',
    mood: 'romantic',

    audioUrl: 'http://localhost:5000/audio/romantic2.mp3',

    albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop'

  },

  {
    title: 'Die For You',
    artist: 'The Weeknd x Ariana Grande',
    mood: 'romantic',

    audioUrl: 'http://localhost:5000/audio/romantic3.mp3',
    albumArt: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop'
  },
  {
    title: 'I wanna be yours',
    artist: 'Arctic Monkeys',
    mood: 'romantic',
    audioUrl: 'http://localhost:5000/audio/romantic4.mp3',
    albumArt: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
  },
  {
    title: 'Girl in Red - We fell in love',
    artist: 'Dan Music',
    mood: 'romantic',
    audioUrl: 'http://localhost:5000/audio/romantic5.mp3',
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
