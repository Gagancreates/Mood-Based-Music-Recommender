# 🎵 Mood-Based Music Recommender

A beautiful, minimal web application that recommends music based on your current mood. Built with React, Node.js, Express, and MongoDB.

![Mood Music App](https://img.shields.io/badge/React-19.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Local-brightgreen)

## Features

- **4 Mood Categories**: Happy, Sad, Romantic, Energetic
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Local Audio**: All music files stored locally - no external API dependencies
- **Favorites**: Save your favorite songs (browser localStorage)
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Fast**: No authentication, no loading delays

## Tech Stack

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

## Setup Instructions

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

### Step 5: Start the Backend Server

```bash
cd backend
npm start
```

### Step 6: Start the Frontend

Open a **new terminal** window/tab:

```bash
cd frontend
npm start
```

## API Endpoints

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

---


