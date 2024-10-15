import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FaArrowRight } from "react-icons/fa";



const FoodItem = ({ id, name, category, sizes, description, image, reviews }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    console.log(cartItems);

    

    
    const [showComments, setShowComments] = useState(false); // State to manage comments visibility

    // Function to calculate the average rating
    const calculateAverageRating = () => {
        if (reviews && reviews.length > 0) {
            const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
            return (totalRatings / reviews.length).toFixed(1); // Return average rating to one decimal place
        }
        return 0;
    };

    const averageRating = calculateAverageRating();

    // Function to render stars
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

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={`${url}/images/${image}`} alt="" />
                
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating row">
                    <p className='col-6'>{name}</p>

                    {sizes.length > 0 && (
                    <p className="col-6 size-item text-end text-black" >
    {/* <span>{sizes[0].size} </span><br /> */}
                    <span>${sizes[0].price.toFixed(2)}</span>
                </p>
                )}

<p className="food-item-desc">{description}</p>


<Row className="order-container align-items-end">
    {/* <Col lg={6}>
<div className="rating">
                        {renderStars()}
                    </div>
                    </Col> */}
                    <Col lg={6}>
  <div 
    className="order-button text-black" 
    onClick={() => addToCart(id)} // Make it clickable to add to cart
    style={{ cursor: 'pointer' }} // Add cursor style for better UX
  >
    Order Now
  </div>
</Col>
<Col lg={6} className='text-end'>
  {
    !cartItems[id] ? (
      <FaArrowRight 
        className='add' 
        onClick={() => addToCart(id)} 
        style={{ cursor: 'pointer', color: 'black' }} // Customize styles as needed
      />
    ) : (
      <div className="food-item-counter">
        <img 
          className='add' 
          onClick={() => removeFromCart(id)} 
          src={assets.remove_icon_red} 
          alt="Remove from cart" 
        />
        <p>{cartItems[id]}</p>
        <FaArrowRight 
          className='add' 
          onClick={() => addToCart(id)} 
          style={{ cursor: 'pointer', color: 'green' }} // Customize styles as needed
        />
      </div>
    )
  }
</Col>

            </Row>


                    {/* {sizes.length === 1 && sizes[0].size === 'Regular' ? (
                    <p className="size-item"><span>{sizes[0].size} </span><br></br>
                    <span>${sizes[0].price.toFixed(2)}</span></p>
                ) : (
                    <div className="sizes">
                        {sizes.map((sizeObj, index) => (
                            <div key={index} className="size-item" style={{ display: 'inline-block', marginRight: '10px' }}>
                                <span>{sizeObj.size} </span><br></br>
                                <span>${sizeObj.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                )} */}
                    
                </div>
                

                

                {/* {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} />
                ) : (
                    <div className="food-item-counter">
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                )} */}
                
                {/* Button to toggle comments */}
                {/* {reviews && reviews.length > 0 && (
                    <button className="toggle-comments" onClick={() => setShowComments(!showComments)}>
                        {showComments ? 'Hide Comments' : 'Show Comments'}
                    </button>
                )} */}

                {/* Render Comments */}
                {/* {showComments && reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p>{review.comment}</p>
                    </div>
                ))} */}

            </div>
        </div>
    );
}

export default FoodItem;
