// src/pages/ExploreMenu.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import Slider from '../Slider/Slider'; // Import Slider component
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
  const { category_list = [] } = useContext(StoreContext);
  const navigate = useNavigate();

  

  const sliderData = category_list.map((item) => ({
    image: item.categoryimage,
    imageFolder: "categoryimages",
    title: item.categoryname,
  }));

  const sliderDesign = {
    container: { backgroundColor: 'transparent', padding: '20px', borderRadius: '10px' },
    title: { color: '#262626', fontSize: '2rem', fontWeight: '700' },
    slide: { margin: '10px', border: '1px solid black', padding: '20px', borderRadius: '15px', paddingTop: '40px' },
    slideTitle: { fontWeight: 'bold', color: '#000', textTransform: 'uppercase', margin: '20px 0 0 0', textAlign: 'center' },
    slideImage: { width: '250px', height: '260px', borderRadius: '10px', },
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='container mt-5'>
       
    
        

        <Slider 
          data={sliderData} 
          design={sliderDesign} 
          title="Categories" 
          slidesToShowSlide={3}  // Pass the dynamic slidesToShow prop
          buttonTitle="See All" // Title for the button
          buttonNav={() => navigate('/categories')}
        />
      </div>
    </div>
  );
};

export default ExploreMenu;
