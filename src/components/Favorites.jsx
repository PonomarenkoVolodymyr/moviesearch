import { Card } from 'react-bootstrap';
import noFav from '../assets/img/no-fav.png'
import useStorage from '../hooks/useStorage';
import FavoriteCard from './FavoriteCard';
import { useState, useEffect } from 'react';
import MovieDetailsModal from './MovieDetailsModal';
import '../assets/css/favorites.scss'

const Favorites = () => {
  const { getItem } = useStorage();
  const [favoriteList, setFavoriteList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedType, setSelectedType] = useState('movie');
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    const favorites = getItem('favoriteList', []);
    setFavoriteList(Array.isArray(favorites) ? favorites : []);
  }, []);

  const handleShowDetails = (movieId, type = 'movie') => {
    setSelectedMovie(movieId);
    setSelectedType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const handleRemoveItem = (itemId) => {
    setFavoriteList(prev => prev.filter(item => item.id !== itemId));
  };

  if (favoriteList.length === 0) {
    return (
      <Card className='custom-card'>
        <Card.Header>
            <h4>No favorites added yet!</h4>
        </Card.Header>
        <Card.Body >
          <img className='no-fav' src={noFav} alt="no results" />
        </Card.Body>
      </Card>      
    );
  }

  function handleFilterToggle(e, type){
    e.preventDefault()
    setFilterType(type)
    const allFilterItems = document.querySelectorAll('.filter-nav li');  
    allFilterItems.forEach(item => {
    item.classList.remove('active');  });  
  if (e && e.currentTarget) {
    e.currentTarget.classList.add('active');
  }
   
  }
  return (
    <>
      <Card className='custom-card'>
        <Card.Header>
            <h4>Your favorites (total: {favoriteList.length})</h4>
        </Card.Header>
        <div className='filter-panel'>
          <ul className='filter-nav'>
            <li className='active' onClick={(e)=>{handleFilterToggle(e, '')}}>All</li>
            <li onClick={(e)=>{handleFilterToggle(e, 'movie')}}>Movie</li>
            <li onClick={(e)=>{handleFilterToggle(e, 'tv')}} >TV Show</li>
            <li onClick={(e)=>{handleFilterToggle(e, 'person')}}>Actor</li>
          </ul>
        </div>
        <Card.Body className='movies-list'>
        {favoriteList
            .filter(item => {
              if (filterType === 'all' || filterType === '') {
                return true; 
              }
              return item.type === filterType || item.media_type === filterType;
            })
            .map((item, index) => (
              <FavoriteCard 
                key={item.id || index} 
                item={item} 
                onRemove={handleRemoveItem}
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

export default Favorites