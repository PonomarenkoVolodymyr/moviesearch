import React from 'react'
import { Card } from 'react-bootstrap'
import '../assets/css/styles.scss'
import noResultsImg from '../assets/img/no-results.png';
import ItemCard from './ItemCard';
const Movies = ({movies, totalItems}) => {

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
    <Card className='custom-card'>
        <Card.Header>
            <h4>Search result (total: {totalItems})</h4>
        </Card.Header>
        <Card.Body className='movies-list'>
          {movies.map((item, index) => <ItemCard item = {item} key={index}/>)}          
        </Card.Body>
    </Card>
  )
}

export default Movies
