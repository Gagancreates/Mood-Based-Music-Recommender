# 🎵 Mood-Based Music Recommender

A beautiful, minimal web application that recommends music based on your current mood. Built with React, Node.js, Express, and MongoDB.

![Mood Music App](https://img.shields.io/badge/React-19.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Local-brightgreen)

## ✨ Features

- 🎭 **4 Mood Categories**: Happy, Sad, Romantic, Energetic
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🎵 **Local Audio**: All music files stored locally - no external API dependencies
- ❤️ **Favorites**: Save your favorite songs (browser localStorage)
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast**: No authentication, no loading delays

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- React Router DOM
- Axios
- CSS3 with animations

### Backend
- Node.js
- Express 5.1.0
- MongoDB (Mongoose 8.20.0)
- CORS
- dotenv

## 📁 Project Structure

```
Mood-Based-Music-Recommender/
├── backend/
│   ├── models/
│   │   └── Song.js              # MongoDB song schema
│   ├── routes/
│   │   └── songs.js             # API routes for songs
│   ├── seeds/
│   │   └── seedSongs.js         # Database seeding script
│   ├── public/
│   │   └── audio/               # MP3 files go here
│   ├── server.js                # Express server
│   ├── .env                     # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SongCard.jsx     # Song card component
│   │   │   └── SongCard.css
│   │   ├── pages/
│   │   │   ├── MoodSelector.jsx # Home page
│   │   │   ├── MoodSelector.css
│   │   │   ├── SongsByMood.jsx  # Songs list page
│   │   │   └── SongsByMood.css
│   │   ├── App.js               # Main app with routing
│   │   └── App.css
│   └── package.json
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** (running locally) - [Download here](https://www.mongodb.com/try/download/community)

### Step 1: Install Dependencies

Navigate to the project root and install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Add Audio Files

This is the **MOST IMPORTANT** step! Add your MP3 files to the `backend/public/audio/` directory:

```bash
backend/public/audio/
├── happy1.mp3
├── happy2.mp3
├── happy3.mp3
├── sad1.mp3
├── sad2.mp3
├── sad3.mp3
├── romantic1.mp3
├── romantic2.mp3
├── romantic3.mp3
├── energetic1.mp3
├── energetic2.mp3
└── energetic3.mp3
```

**Important Notes:**
- You need to provide your own MP3 files (3 songs per mood = 12 total)
- Name them exactly as shown above, or update the seed script accordingly
- Use royalty-free music or music you have rights to use
- Each file should be a 30-60 second preview for best user experience

**Where to find free music:**
- [Free Music Archive](https://freemusicarchive.org/)
- [Incompetech](https://incompetech.com/)
- [Bensound](https://www.bensound.com/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)

### Step 3: Start MongoDB

Make sure MongoDB is running on your machine:

```bash
# On macOS (with Homebrew)
brew services start mongodb-community

# On Windows (run as service or manually)
mongod

# On Linux
sudo systemctl start mongod
```

Verify MongoDB is running by checking:
```bash
mongosh
# or
mongo
```

### Step 4: Seed the Database

Run the seed script to populate MongoDB with song metadata:

```bash
cd backend
npm run seed
```

You should see output like:
```
✅ Connected to MongoDB
✅ Cleared existing songs
✅ Successfully seeded 12 songs

📊 Songs by mood:
   energetic: 3 songs
   happy: 3 songs
   romantic: 3 songs
   sad: 3 songs

🎉 Database seeding completed successfully!
```

### Step 5: Start the Backend Server

```bash
cd backend
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
🎵 Audio files available at http://localhost:5000/audio
✅ Connected to MongoDB
```

### Step 6: Start the Frontend

Open a **new terminal** window/tab:

```bash
cd frontend
npm start
```

The app should automatically open in your browser at `http://localhost:3000`

## 🎮 How to Use

1. **Select a Mood**: On the home page, click on any mood card (Happy, Sad, Energetic, etc.)
2. **Browse Songs**: You'll see a curated list of songs for that mood
3. **Play Music**: Click play on any song's audio player to listen
4. **Add to Favorites**: Click the heart icon to save songs (stored in browser)
5. **Go Back**: Click the "← Back" button to choose a different mood

## 🌐 API Endpoints

### Get all songs by mood
```
GET /api/songs/mood/:mood
```

Example:
```bash
curl http://localhost:5000/api/songs/mood/happy
```

Response:
```json
{
  "mood": "happy",
  "count": 3,
  "songs": [
    {
      "_id": "...",
      "title": "Sunshine Vibes",
      "artist": "The Happy Bunch",
      "mood": "happy",
      "audioUrl": "http://localhost:5000/audio/happy1.mp3",
      "albumArt": "..."
    }
  ]
}
```

### Get all songs
```
GET /api/songs
```

### Health check
```
GET /api/health
```

## 🎨 Customization

### Change Mood Colors

Edit the gradient colors in `frontend/src/pages/MoodSelector.jsx`:

```javascript
const moods = [
  {
    name: 'Happy',
    emoji: '😊',
    gradient: 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)',
  },
  // ...
];
```

### Add More Songs

1. Add more MP3 files to `backend/public/audio/`
2. Update `backend/seeds/seedSongs.js` with new song objects
3. Run `npm run seed` again

### Change Album Art

Update the `albumArt` URLs in `backend/seeds/seedSongs.js` to use your own images.

## 🐛 Troubleshooting

### Audio files not playing

**Problem**: Audio player shows but doesn't play
**Solution**:
- Check that MP3 files exist in `backend/public/audio/`
- Verify the backend server is running on port 5000
- Check browser console for CORS errors
- Make sure audio URLs in database match actual file names

### MongoDB connection error

**Problem**: `MongoServerError: connect ECONNREFUSED`
**Solution**:
- Make sure MongoDB is running (`mongod` command or service)
- Check if MongoDB is on default port 27017
- Update `MONGODB_URI` in `.env` if using different port

### Port already in use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`
**Solution**:
```bash
# On macOS/Linux
lsof -ti:5000 | xargs kill -9

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Frontend shows "Failed to fetch songs"

**Problem**: Songs don't load on mood page
**Solution**:
- Make sure backend is running on http://localhost:5000
- Check that database was seeded successfully
- Verify API endpoint: http://localhost:5000/api/songs/mood/happy

## 📝 Environment Variables

Backend `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/mood-music-db
PORT=5000
```

## 🚢 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Update `MONGODB_URI` to use MongoDB Atlas cloud database
2. Ensure audio files are committed to repo or use cloud storage
3. Set environment variables in hosting platform
4. Deploy backend

### Frontend Deployment (e.g., Vercel, Netlify)

1. Update API URL in `frontend/src/pages/SongsByMood.jsx`:
```javascript
const response = await axios.get(`YOUR_BACKEND_URL/api/songs/mood/${mood}`);
```

2. Build frontend:
```bash
cd frontend
npm run build
```

3. Deploy the `build` folder

## 📜 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Album art images from Unsplash
- Icons: Emoji characters
- Design inspiration: Modern music streaming apps

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Made with ❤️ and 🎵

**Enjoy your mood-based music experience!**
