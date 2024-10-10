import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './upload.css';

const ExploreUploadTv = () => {
  const [tmdbId, setTmdbId] = useState('');
  const [session, setSession] = useState('');
  const [episode, setEpisode] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://server-t4sa.onrender.com/upload/tv', {
        tmdbId,
        session,
        episode,
        url,
      });

      setMessage(response.data.message);
      toast.success('TV show uploaded successfully!');
      setTmdbId('');
      setSession('');
      setEpisode('');
      setUrl('');
    } catch (error) {
      console.error('Error uploading TV show:', error);
      setMessage('Failed to upload TV show');
      toast.error('Failed to upload TV show');
    } finally {
      setLoading(false); 
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`submit-button ${loading ? 'disabled' : ''}`}
          disabled={loading}
        >
          {loading ? <span className="loader"></span> : 'Upload TV Show'}
        </button>
      </form>
    </div>
  );
};

export default ExploreUploadTv;
