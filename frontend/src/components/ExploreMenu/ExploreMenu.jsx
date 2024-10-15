import React, { useContext, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ExploreMenu.css';
import { StoreContext } from '../context/StoreContext';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ExploreMenu = ({ category, setCategory }) => {
  const { category_list = [] } = useContext(StoreContext);
  const url = "http://localhost:4000";
  const scrollRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='container mt-5'>
        <div className='d-flex align-items-center justify-content-between'>
          <h1>Categories</h1>
          <Button 
            variant="warning" 
            className='header-button ms-auto px-5' 
            onClick={() => navigate('/categories')} // Navigate to /categories
          >
            See All
          </Button>
        </div>
        {/* Scrollable row with arrow buttons */}
        <div className="position-relative">
          <div className="explore-menu-list d-flex overflow-auto" ref={scrollRef}>
            {category_list.map((item, index) => (
              <div 
                key={index} 
                className="align-items-center mx-3"
                onClick={() => setCategory(prev => prev === item.categoryname ? 'All' : item.categoryname)}
                style={{ flex: '0 0 auto' }}
              >
                <img 
                  className={`img-fluid rounded-circle ${category === item.categoryname ? 'border border-danger' : ''}`} 
                  src={url + '/categoryimages/' + item.categoryimage} 
                  alt={item.categoryname}
                  style={{ width: '100px', height: '100px', cursor: 'pointer', marginBottom: '-40%' }}
                />
                <div className='category'>
                  <p className="category-text">{item.categoryname}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Uncomment if you want scroll arrows */}
          {/* <FaArrowLeft className="arrow left-arrow" onClick={() => scroll('left')} />
          <FaArrowRight className="arrow right-arrow" onClick={() => scroll('right')} /> */}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ExploreMenu;
