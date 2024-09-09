import React, { useState } from 'react';
import axios from 'axios';
import "./upload.css";

const ExploreUploadMovie = () => {
  const [tmdbId, setTmdbId] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://server-t4sa.onrender.com/upload/movie', {
        tmdbId,
        url,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading movie:', error);
      setMessage('Failed to upload movie');
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Movie</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>TMDB ID:</label>
          <input
            type="text"
            value={tmdbId}
            onChange={(e) => setTmdbId(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Upload Movie
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};


export default ExploreUploadMovie;
