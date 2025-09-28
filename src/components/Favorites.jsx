import { Card } from 'react-bootstrap';
import noFav from '../assets/img/no-fav.png'
import useStorage from '../hooks/useStorage';
import FavoriteCard from './FavoriteCard';
import { useState, useEffect } from 'react';

const Favorites = () => {
  const { getItem } = useStorage();
  const [favoriteList, setFavoriteList] = useState([]);
 
  useEffect(() => {
    const favorites = getItem('favoriteList', []);
    setFavoriteList(Array.isArray(favorites) ? favorites : []);
  }, []);

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

  return (
    <Card className='custom-card'>
        <Card.Header>
            <h4>Your favorites (total: {favoriteList.length})</h4>
        </Card.Header>
        <Card.Body className='movies-list'>
          {favoriteList.map((item, index) => (
            <FavoriteCard 
              key={item.id || index} 
              item={item} 
              onRemove={handleRemoveItem}
            />
          ))}          
        </Card.Body>
    </Card>
  )
}
export default Favorites;