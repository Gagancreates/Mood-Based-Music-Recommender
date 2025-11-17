import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SongCard from '../components/SongCard';
import './Favorites.css';

const Favorites = () => {
  const navigate = useNavigate();
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavoriteSongs();
  }, []);

  const fetchFavoriteSongs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get favorite IDs from localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (favorites.length === 0) {
        setFavoriteSongs([]);
        setLoading(false);
        return;
      }

      // Fetch all songs from backend
      const response = await axios.get('http://localhost:5000/api/songs');
      const allSongs = response.data.songs;

      // Filter to get only favorited songs
      const favSongs = allSongs.filter(song => favorites.includes(song._id));
      setFavoriteSongs(favSongs);
    } catch (err) {
      console.error('Error fetching favorite songs:', err);
      setError('Failed to load favorite songs. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Listen for storage changes to update favorites in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      fetchFavoriteSongs();
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab updates
    window.addEventListener('favoritesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  const getMoodColor = (mood) => {
    const colors = {
      happy: '#FFD93D',
      sad: '#6C95D1',
      romantic: '#FF85C1',
      energetic: '#FF6B6B'
    };
    return colors[mood] || '#667eea';
  };

  return (
    <div className="favorites-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className="favorites-title">
          ❤️ Your Favorites
        </h1>
        <p className="favorites-count">
          {!loading && favoriteSongs.length > 0 && `${favoriteSongs.length} songs`}
        </p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading your favorites...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchFavoriteSongs}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && favoriteSongs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💔</div>
          <h2>No favorites yet</h2>
          <p>Start adding songs to your favorites by clicking the heart icon!</p>
          <button className="back-button explore-button" onClick={() => navigate('/')}>
            Explore Moods
          </button>
        </div>
      )}

      {!loading && !error && favoriteSongs.length > 0 && (
        <div className="favorites-grid">
          {favoriteSongs.map((song) => (
            <SongCard
              key={song._id}
              song={song}
              moodColor={getMoodColor(song.mood)}
              onFavoriteChange={fetchFavoriteSongs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
