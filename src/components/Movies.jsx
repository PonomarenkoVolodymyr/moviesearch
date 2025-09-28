import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import '../assets/css/styles.scss'
import noResultsImg from '../assets/img/no-results.png';
import ItemCard from './ItemCard';
import MovieDetailsModal from './MovieDetailsModal';


const Movies = ({movies, totalItems}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedType, setSelectedType] = useState('movie');

  const handleShowDetails = (movieId, type = 'movie') => {
    setSelectedMovie(movieId);
    setSelectedType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  if (movies.length === 0) {
    return (
      <Card className='custom-card'>
        <Card.Header>
            <h4>Start searching for results!</h4>
        </Card.Header>
        <Card.Body >
        <img className='no-res' src={noResultsImg} alt="no results" />
        </Card.Body>
      </Card>      
    );
  }

  return (
    <>
      <Card className='custom-card'>
        <Card.Header>
            <h4>Search result (total: {totalItems})</h4>
        </Card.Header>
        <Card.Body className='movies-list'>
          {movies.map((item, index) => (
            <ItemCard 
              item={item} 
              key={index}
              onShowDetails={handleShowDetails}
            />
          ))}          
        </Card.Body>
      </Card>

      <MovieDetailsModal
        show={showModal}
        onHide={handleCloseModal}
        movieId={selectedMovie}
        type={selectedType}
      />
    </>
  )
}

export default Movies
