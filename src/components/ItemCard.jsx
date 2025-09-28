// 

import { useContext, useEffect, useState } from 'react'
import noImage from '../assets/img/no-img.png'
import '../assets/css/cardItem.scss'
import { formatDate } from '../helper'
import { TypeContext } from '../App'
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify'

const ItemCard = ({ item, onShowDetails }) => {
  const type = useContext(TypeContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
  
  let title = '', date = '', imgSrc = ''
  
  switch (type) {
    case "movie":
      title = item.title
      date = item.release_date
      imgSrc = item.poster_path ? IMG_PATH + item.poster_path : noImage
      break
    case "tv":
      title = item.name
      date = item.first_air_date
      imgSrc = item.poster_path ? IMG_PATH + item.poster_path : noImage
      break
    case "person":
      title = item.name
      date = null
      imgSrc = item.profile_path ? IMG_PATH + item.profile_path : noImage
      break
  }

  useEffect(() => {
    checkIfFavorite();
  }, [item.id]);

  const checkIfFavorite = () => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    const isItemFavorite = favoriteList.some(favItem => favItem.id === item.id);
    setIsFavorite(isItemFavorite);
  }

  const toggleFavorite = () => {
    let favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    const index = favoriteList.findIndex((el) => el.id === item.id);
    
    if (index === -1) {      
      favoriteList.push({
        ...item,
        type: type, 
        cardTitle: title 
      });
      setIsFavorite(true);
      toast.success(`"${title}" added to Favorites`);
    } else {      
      favoriteList.splice(index, 1);
      setIsFavorite(false);
      toast.error(`"${title}" removed from Favorites`);
    }

    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
  }

  const getFavoriteButtonClass = () => {
    return isFavorite ? 'btn btn-warning btn-favorite' : 'btn btn-secondary btn-favorite';
  }

  const getFavoriteButtonTitle = () => {
    return isFavorite ? 'Remove from favorite' : 'Add to favorite';
  }

  const handleDetailsClick = () => {
    if (onShowDetails) {
      onShowDetails(item.id, type);
    }
  }

  let isDate = true
  if (date === "" || date === undefined || date === null) {isDate = false}

  return (    
    <div className="item-card">  
      <div className="img-wrap">
        <img src={imgSrc} alt={`${title} poster`} />
      </div>     
      <div className="item-card-body">
        <h5 className="card-title">{title}</h5>
        {isDate ? <time className='date-time' dateTime={date}>{formatDate(date)}</time> : <p className='date-time'>Date not available</p> }
        <div className='button-group'>
          <button 
            type="button" 
            className="btn btn-primary btn-details" 
            title='Show detail info'
            onClick={handleDetailsClick}
          >
            Details
          </button>
          <button 
            type="button" 
            onClick={toggleFavorite} 
            className={getFavoriteButtonClass()}
            title={getFavoriteButtonTitle()}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>  
  )
}

export default ItemCard