import { useContext } from 'react'
import noImage from '../assets/img/no-img.png'
import '../assets/css/cardItem.scss'
import { formatDate } from '../helper'
import { TypeContext } from '../App'
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify'
import useStorage from '../hooks/useStorage'

const FavoriteCard = ({ item, onRemove }) => {
  const type = useContext(TypeContext);
  const { getItem, setItem } = useStorage();
  
  const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
  
  let title = '', date = '', imgSrc = ''
   
  switch (item.type || type) {
    case "movie":
      title = item.title || item.cardTitle
      date = item.release_date
      imgSrc = item.poster_path ? IMG_PATH + item.poster_path : noImage
      break
    case "tv":
      title = item.name || item.cardTitle
      date = item.first_air_date
      imgSrc = item.poster_path ? IMG_PATH + item.poster_path : noImage
      break
    case "person":
      title = item.name || item.cardTitle
      date = null
      imgSrc = item.profile_path ? IMG_PATH + item.profile_path : noImage
      break
    default:
      title = item.title || item.name || item.cardTitle || 'Unknown'
      date = item.release_date || item.first_air_date
      imgSrc = item.poster_path || item.profile_path 
        ? IMG_PATH + (item.poster_path || item.profile_path) 
        : noImage
  }

  const removeFromFavorites = () => {
    try {
      const favoriteList = getItem('favoriteList', []);
      
     
      const index = favoriteList.findIndex(favItem => favItem.id === item.id);
      
      if (index !== -1) {
        
        const updatedFavorites = [...favoriteList];
        updatedFavorites.splice(index, 1);
        
        setItem('favoriteList', updatedFavorites);
        toast.error(`"${title}" removed from Favorites`);
        
       
        if (onRemove) {
          onRemove(item.id);
        }
      } else {
        toast.warning('Item not found in favorites');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Error removing item from favorites');
    }
  }
 let isDate = true
  if (date === "" || date === undefined ||date === null) isDate = false


  return (    
    <div className="item-card">  
      <div className="img-wrap">
        <img src={imgSrc} alt={`${title} poster`} />
      </div>     
      <div className="item-card-body">
        <h5 className="card-title">{title}</h5>
        {isDate ? (
          <time className='date-time' dateTime={date}>{formatDate(date)}</time>
        ) : (
          <p className='date-time'>Date not available</p>
        )}
        <div className='button-group'>
          <button type="button" className="btn btn-primary btn-details" title='Show detail info'>Details</button>
          <button 
            type="button" 
            onClick={removeFromFavorites} 
            className="btn btn-danger"
            title="Remove from favorites"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>  
  )
}

export default FavoriteCard