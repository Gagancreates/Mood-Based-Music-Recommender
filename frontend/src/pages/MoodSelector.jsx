import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelector.css';

const MoodSelector = () => {
  const navigate = useNavigate();

  const moods = [
    {
      name: 'Happy',
      emoji: '😊',
      color: '#FFD93D',
      gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFA726 100%)',
      description: 'Feel the joy'
    },
    {
      name: 'Sad',
      emoji: '😢',
      color: '#6C95D1',
      gradient: 'linear-gradient(135deg, #6C95D1 0%, #4A6FA5 100%)',
      description: 'Embrace emotions'
    },
    {
      name: 'Romantic',
      emoji: '💕',
      color: '#FF85C1',
      gradient: 'linear-gradient(135deg, #FF85C1 0%, #F56EB3 100%)',
      description: 'Love in the air'
    },
    {
      name: 'Energetic',
      emoji: '⚡',
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%)',
      description: 'Power up'
    }
  ];

  const handleMoodSelect = (moodName) => {
    navigate(`/mood/${moodName.toLowerCase()}`);
  };

  return (
    <div className="mood-selector-container">
      <div className="header">
        <button className="favorites-nav-button" onClick={() => navigate('/favorites')}>
          ❤️ Favorites
        </button>
        <h1 className="title">🎵 Mood Music</h1>
        <p className="subtitle">How are you feeling today?</p>
      </div>

      <div className="moods-grid">
        {moods.map((mood) => (
          <div
            key={mood.name}
            className="mood-card"
            style={{ background: mood.gradient }}
            onClick={() => handleMoodSelect(mood.name)}
          >
            <div className="mood-emoji">{mood.emoji}</div>
            <h3 className="mood-name">{mood.name}</h3>
            <p className="mood-description">{mood.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
