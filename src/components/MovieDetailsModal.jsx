import { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../assets/css/movieDetails.scss'
import Loader from './Loader';
import { formatDate } from '../helper';

const MovieDetailsModal = ({ show, onHide, movieId, type = 'movie' }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_TOKEN = import.meta.env.VITE_API_TOKEN;
  const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
  const noImage = '/assets/img/no-img.png';

  useEffect(() => {
    if (show && movieId) {
      fetchDetails();
    }
  }, [show, movieId]);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `https://api.themoviedb.org/3/${type}/${movieId}?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_TOKEN}`
        }
      };

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setDetails(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load details');
    } finally {
      setLoading(false);
    }
  };

  const getRuntime = (minutes) => {
    if (!minutes) return 'Data not available';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {details ? details.title || details.name : 'Movie Details'}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {loading &&  <Loader/>}

        {error && (
          <Alert variant="danger">
            Failed to load details: {error}
          </Alert>
        )}

        {details && !loading && (
          <div className="modal-content-wrap">
            <div className="main-info d-flex flex-column flex-md-row gap-4">
              <div className="img-section text-center">
                <img 
                  src={details.poster_path ? `${IMG_PATH}${details.poster_path}` : noImage} 
                  alt={details.title || details.name} 
                  className="img-fluid rounded"
                  style={{ maxWidth: '300px' }}
                  onError={(e) => {
                    e.target.src = noImage;
                  }}
                />
              </div>
              
              <div className="details-section flex-grow-1">
                <h4 className="mb-3">{details.title || details.name}</h4>
                
                <div className="details-list">

                  <p><strong>Released:</strong> <span>{formatDate(details.release_date || details.first_air_date)}</span></p>
                  
                  <p><strong>Genre:</strong> <span>
                    {details.genres && details.genres.length > 0 
                      ? details.genres.map(genre => genre.name).join(', ')
                      : 'N/A'
                    }
                  </span></p>
                  
                  <p><strong>Runtime:</strong> <span>
                    {type === 'movie' 
                      ? getRuntime(details.runtime)
                      : details.episode_run_time && details.episode_run_time.length > 0
                        ? `${details.episode_run_time[0]}m per episode`
                        : 'N/A'
                    }
                  </span></p>
                  
                  <p><strong>Country:</strong> <span>
                    {details.production_countries && details.production_countries.length > 0
                      ? details.production_countries.map(country => country.name).join(', ')
                      : 'N/A'
                    }
                  </span></p>
                  
                  <p><strong>Rating:</strong> <span>
                    {details.vote_average ? `${details.vote_average}/10` : 'N/A'}
                  </span></p>
                  
                  {details.created_by && details.created_by.length > 0 && (
                    <p><strong>Created by:</strong> <span>
                      {details.created_by.map(person => person.name).join(', ')}
                    </span></p>
                  )}
                  
                  <p><strong>Languages:</strong> <span>
                    {details.spoken_languages && details.spoken_languages.length > 0
                      ? details.spoken_languages.map(lang => lang.english_name).join(', ')
                      : 'N/A'
                    }
                  </span></p>
                  
                  <p><strong>Status:</strong> <span>{details.status || 'N/A'}</span></p>
                </div>
              </div>
            </div>
            
            <div className="summary mt-4">
              <h5>Overview</h5>
              <p>{details.overview || 'No overview available.'}</p>
            </div>

            {details.production_companies && details.production_companies.length > 0 && (
              <div className="production mt-3">
                <h6>Production Companies</h6>
                <p>{details.production_companies.map(company => company.name).join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetailsModal;