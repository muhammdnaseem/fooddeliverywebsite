import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { StoreContext } from '../context/StoreContext';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, category, sizes, description, image, reviews }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  

  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false); // Manage comments visibility

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews && reviews.length > 0) {
      const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
      return (totalRatings / reviews.length).toFixed(1);
    }
    return 0;
  };

  const averageRating = calculateAverageRating();

  // Render stars based on average rating
  const renderStars = () => {
    const stars = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span key={i} className={i <= averageRating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }

    return stars;
  };

  const handleAddToCartAndRedirect = async (itemId, defaultSize) => {
    try {
      const response = await addToCart(itemId, defaultSize); // Wait for the response from addToCart
      console.log('Add to cart response:', response); // Log the response

      // Redirect to /add-extra and pass itemId and size as state
      navigate('/add-extra', { state: { itemId, size: defaultSize } });
    } catch (error) {
      console.error('Failed to add item to cart:', error); // Log any errors from addToCart
    }
  };



  return (
    <div className='food-item '>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating row">
          <p className='col-6'>{name}</p>
          {sizes.length > 0 && (
            <p className="col-6 size-item text-end text-black">
              <span>${sizes[0].price.toFixed(2)}</span>
            </p>
          )}
        </div>

        <p className="food-item-desc">{description}</p>

        {/* Rating Stars */}
        {/* <div className="rating-stars">
          {renderStars()} ({averageRating})
        </div> */}

        {/* Order Section */}
        <Row className="order-container align-items-end">
          <Col lg={6} sm={6} md={6}>
            <div
              className="order-button text-black"
              onClick={() => handleAddToCartAndRedirect(id, sizes[0])}
              style={{ cursor: 'pointer' }}
            >
              Order Now
            </div>
          </Col>
          <Col lg={6} sm={6} md={6} className="add text-end">
            <FaArrowRight
              className="add"
              onClick={() => handleAddToCartAndRedirect(id, sizes[0])}
              style={{ cursor: 'pointer', color: 'black' }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FoodItem;
