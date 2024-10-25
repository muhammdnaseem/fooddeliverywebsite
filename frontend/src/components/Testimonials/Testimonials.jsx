import React from 'react';
import Slider from '../Slider/Slider';


const Testimonials = () => {
  const reviews = [
    {
      name: 'Ama Khan',
      rating: 3,
      review: 'Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque. Lorem ipsum dolor sit amet consectetur.',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'John Doe',
      rating: 4,
      review: 'Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque.',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Jane Doe',
      rating: 5,
      review: 'Amazing experience! Highly recommend their service. Lorem ipsum dolor sit amet.',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Michael Smith',
      rating: 2,
      review: 'Service was okay but could be improved. Lorem ipsum dolor sit amet consectetur.',
      image: 'https://via.placeholder.com/150'
    }
  ];


  const sliderDesign = {
    container: { backgroundColor: 'transparent', padding: '20px', borderRadius: '10px' },
    title: { color: '#262626', fontSize: '2rem', fontWeight: '700' },
    slide: {
      margin: '10px',
      marginTop: '50px',
      border: '1px solid #ffc107', // Border color
      padding: '0px',
      borderRadius: '80px 30px 80px 30px', // Rounded corners
      paddingTop: '40px',
      boxShadow: '0 2px 5px #ffc107', // Add box shadow
      backgroundColor: 'white', // Ensure background color is set
  },
  
  
    slideTitle: { fontWeight: 'bold', color: '#000', textTransform: 'uppercase', margin: '20px 0 0 0' },
    slideImage: { width: '100px', height: '100px', borderRadius: '50%', border: '1px solid black', marginTop: '-100px' },
  };
 

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='container mt-5'>
       
    
        

        <Slider 
          data={reviews} 
          design={sliderDesign} 
          title="Here Fom Our Customer" 
          slidesToShowSlide={2}  // Pass the dynamic slidesToShow prop
          
        />
      </div>
    </div>
  );
};

export default Testimonials;
