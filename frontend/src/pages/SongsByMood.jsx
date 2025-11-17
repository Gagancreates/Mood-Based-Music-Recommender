import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SongCard from '../components/SongCard';
import './SongsByMood.css';

const SongsByMood = () => {
  const { mood } = useParams();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    romantic: '💕',
    energetic: '⚡'
  };

  const moodColors = {
    happy: '#FFD93D',
    sad: '#6C95D1',
    romantic: '#FF85C1',
    energetic: '#FF6B6B'
  };

  useEffect(() => {
    fetchSongs();
  }, [mood]);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/songs/mood/${mood}`);
      setSongs(response.data.songs);
    } catch (err) {
      console.error('Error fetching songs:', err);
      setError('Failed to load songs. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="songs-by-mood-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className="mood-title" style={{ color: moodColors[mood] }}>
          {moodEmojis[mood]} {mood.charAt(0).toUpperCase() + mood.slice(1)} Vibes
        </h1>
        <p className="songs-count">
          {!loading && songs.length > 0 && `${songs.length} songs`}
        </p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading songs...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchSongs}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && songs.length === 0 && (
        <div className="empty-state">
          <p>No songs found for this mood yet.</p>
          <button className="back-button" onClick={() => navigate('/')}>
            Choose Another Mood
          </button>
        </div>
      )}

      {!loading && !error && songs.length > 0 && (
        <div className="songs-grid">
          {songs.map((song) => (
            <SongCard key={song._id} song={song} moodColor={moodColors[mood]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SongsByMood;
