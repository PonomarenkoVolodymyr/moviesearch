import React, { useState, useEffect } from 'react'
import { Card, Pagination } from 'react-bootstrap'
import '../assets/css/styles.scss'
import noResultsImg from '../assets/img/no-results.png';
import ItemCard from './ItemCard';
import MovieDetailsModal from './MovieDetailsModal';

const Movies = ({ movies, totalItems, totalPages, currentPage, onPageChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedType, setSelectedType] = useState('movie');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  
  const renderPaginationItems = () => {
    const items = [];
    
    // Розрахунок сторінок:
    let maxPagesToShow;
    if (windowWidth < 576) { // mobile
      maxPagesToShow = 3;
    } else if (windowWidth < 768) { // tablet
      maxPagesToShow = 5;
    } else { // desktop
      maxPagesToShow = 7;
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

       if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

       if (windowWidth < 576 && startPage > 1) {
      items.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => onPageChange(1)}
        >
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }
    
    if (windowWidth < 576 && endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  // Пагінація для мобілки
  const renderMobilePagination = () => (
    <div className="d-flex justify-content-between align-items-center w-100">
      <Pagination.Prev 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="flex-grow-1 text-center"
      >
        Previous
      </Pagination.Prev>
      
      <span className="mx-3 text-nowrap">
        Page {currentPage} of {totalPages}
      </span>
      
      <Pagination.Next 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="flex-grow-1 text-center"
      >
        Next
      </Pagination.Next>
    </div>
  );

  if (!movies || movies.length === 0) {
    return (
      <Card className='custom-card'>
        <Card.Header>
            <h4>Start searching for results!</h4>
        </Card.Header>
        <Card.Body>
          <img className='no-res' src={noResultsImg} alt="no results" />
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className='custom-card'>
        <Card.Header>
            <h4>Search result (total: {totalItems} | page: {currentPage})</h4>
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
      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          {windowWidth < 576 ? (
            // Мобільна рагінація
            <Pagination className="pagination-dark w-100">
              {renderMobilePagination()}
            </Pagination>
          ) : (
            // Десктопна пагінація
            <Pagination className="pagination-dark">
              <Pagination.First 
                onClick={() => onPageChange(1)} 
                disabled={currentPage === 1} 
              />
              <Pagination.Prev 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
              />
              {renderPaginationItems()}
              <Pagination.Next 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
              />
              <Pagination.Last 
                onClick={() => onPageChange(totalPages)} 
                disabled={currentPage === totalPages} 
              />
            </Pagination>
          )}
        </div>
      )}

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
