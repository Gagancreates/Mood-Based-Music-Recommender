import React, { useState } from 'react';
import './SongCard.css';

const SongCard = ({ song, moodColor }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(song._id);
  });

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== song._id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(song._id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <div className="song-card">
      <div className="album-art-container">
        <img
          src={song.albumArt}
          alt={`${song.title} album art`}
          className="album-art"
        />
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          style={{ color: isFavorite ? moodColor : '#fff' }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
      </div>

      <div className="audio-player">
        <audio controls className="audio-controls">
          <source src={song.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default SongCard;
