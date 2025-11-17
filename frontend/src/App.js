import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodSelector from './pages/MoodSelector';
import SongsByMood from './pages/SongsByMood';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MoodSelector />} />
          <Route path="/mood/:mood" element={<SongsByMood />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
