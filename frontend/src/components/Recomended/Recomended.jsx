// src/pages/ExploreMenu.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import Slider from '../Slider/Slider'; // Import Slider component
import FoodItem from '../FoodItem/FoodItem'; // Import FoodItem component

const Recommended = ({ category, setCategory }) => {
  const { category_list = [], food_list = [] } = useContext(StoreContext);
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(3); // Default slides to show

  // Adjust slidesToShow based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 992) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize(); // Call once initially
    window.addEventListener('resize', handleResize); // Add resize listener

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);


  const sliderData = food_list.map(item => ({
    image: item.image,
    imageFolder: "images",
    productname: item.name,
    price: item.sizes?.[0]?.price ?? 'N/A',
    dealdescription: item.description
  }));

  const sliderDesign = {
    container: {
      backgroundColor: 'transparent',
      padding: '20px',
      borderRadius: '10px',
    },
    title: {
      color: '#262626',
      fontSize: '2rem',
      fontWeight: '700',
    },
    slide: {
      maxWidth: '280px',
      maxHeight: '330px',
      margin: '10px',
      border: '1px solid black',
      padding: '0px',
      borderRadius: '20px',
      boxShadow: '0px 0px 10px #00000015',
      transition: '0.3s',
      animation: 'fadeIn 1s',
    },
    slideImage: {
      width: '100%',
      height: '200px',
      borderRadius: '20px 20px 0px 0px',
    },
    slideProductInfo : {
        marginTop: '-50px',
        padding: '0 10px 10px 10px',
        border: '1px solid black',
        borderRadius: '20px 20px 20px 20px',
        maxHeight: '130px',
    },
    slideTitle: {
      fontWeight: 'bold',
      color: '#000',
      textTransform: 'uppercase',
      margin: '0px 0 0 0',
      textAlign: 'center',
    },
    slideFoodDescription: {
        display: 'flex',
        justifyContent: 'space-between', // Ensures name is on the left and price on the right
        alignItems: 'center', // Vertically center the content
        width: '100%',
        padding: '10px',
        marginTop: '0'
      },
      slideProductName: {
        fontSize: '18px',
        fontWeight: '500',
      color: '#000',
      textTransform: 'uppercase',
      },
      slidePrice: {
        color: 'black',
        fontSize: '18px',
        fontWeight: '500',
      },
    slideDescription: {
      color: '#676767',
      fontSize: '12px',
      marginTop: '-10px',
      height: '50px',
      overflow: 'hidden',
    },

    
    counterContainer: {
      position: 'relative',
      bottom: '15px',
      right: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '6px',
      borderRadius: '50px',
      backgroundColor: 'white',
    },
    addButton: {
      width: '35px',
      borderRadius: '50%',
      cursor: 'pointer',
    },
    rating: {
      fontSize: '1.2em',
      color: '#FFD700',
    },
  };
  

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='container '>
        <Slider
        data={sliderData}
          design={sliderDesign}
          title="Recommended foods"
          slidesToShow={3}
         
          
        />
      </div>
    </div>
  );
};

export default Recommended;
