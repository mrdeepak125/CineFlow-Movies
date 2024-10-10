import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './upload.css';

const ExploreUploadMovie = () => {
  const [tmdbId, setTmdbId] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); 

    try {
      const response = await axios.post('https://server-t4sa.onrender.com/upload/movie', {
        tmdbId,
        url,
      });

      setMessage(response.data.message);
      toast.success('Movie uploaded successfully!'); 
      setTmdbId(''); 
      setUrl('');
    } catch (error) {
      console.error('Error uploading movie:', error);
      setMessage('Failed to upload movie');
      toast.error('Failed to upload movie');
    } finally {
      setLoading(false); 
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
          {loading ? <span className="loader"></span> : 'Upload Movie'}
        </button>
      </form>
    </div>
  );
};

export default ExploreUploadMovie;
