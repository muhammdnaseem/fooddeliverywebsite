import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Testimonials.css'; // Import custom CSS

const TestimonialCard = ({ image, name, rating, review }) => {
  return (
    <Card style={{
      minHeight: '250px',
      borderRadius: '20px',
      padding: '40px',
      backgroundColor: 'white',
      textAlign: 'center',
      borderTopLeftRadius: '100px',
      borderBottomRightRadius: '100px',
      minWidth: '100%',
      overflow: 'visible',
    }}>
      <Card.Img
        variant="top"
        src={image}
        alt={name}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          margin: '-60px auto 10px',
        }}
      />
      <Card.Body>
        <Card.Text>{review}</Card.Text>
        <Card.Title>{name}</Card.Title>
        <div className='pb-3'>
          {[...Array(5)].map((_, index) => (
            <span key={index}
              style={{
                color: index < rating ? '#ffc107' : '#e4e5e9',
                fontSize: '24px',
              }}>★</span>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 cards on larger screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // For tablets and mobile screens
        settings: {
          slidesToShow: 1, // Show 1 card on smaller screens
          slidesToScroll: 1,
        }
      }
    ],
    appendDots: dots => (
      <div style={{ marginTop: '20px' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: '15px',
          height: '15px',
          backgroundColor: '#ffc107', // Custom dot color
          borderRadius: '50%',
          margin: '0 5px',
          cursor: 'pointer',
        }}
      />
    ),
  };

  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#fff3cd' }}>
      <Container>
        <h2 className="text-start mb-4">Hear From Our Customers</h2>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="px-3">
              <TestimonialCard {...review} />
            </div>
          ))}
        </Slider>
      </Container>
    </Container>
  );
};

export default Testimonials;
