import React, { useState } from 'react';
import axios from 'axios';
import "./upload.css";

const ExploreUploadTv = () => {
  const [tmdbId, setTmdbId] = useState('');
  const [session, setSession] = useState('');
  const [episode, setEpisode] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://server-t4sa.onrender.com/upload/tv', {
        tmdbId,
        session,
        episode,
        url,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading TV show:', error);
      setMessage('Failed to upload TV show');
    }
  };

  return (
    <div className="form-container">
      <h2>Upload TV Show</h2>
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
          <label>Session:</label>
          <input
            type="number"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Episode:</label>
          <input
            type="number"
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
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
          Upload TV Show
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ExploreUploadTv;
