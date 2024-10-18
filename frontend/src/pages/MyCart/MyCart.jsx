import React, { useContext, useState, useEffect } from 'react';
import './MyCart.css';
import { StoreContext } from '../../components/context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon for related items
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const MyCart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    selectedSizes,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);
 
    const [relatedItems, setRelatedItems] = useState([]);
    const navigate = useNavigate(); // Initialize navigate
   

  const getPriceForSize = (item, size) => {
    const sizeObj = item.sizes.find((s) => s.size === size);
    return sizeObj ? sizeObj.price : 0;
  };

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2.0;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  // Calculate Related Items whenever the cart or food_list changes
  useEffect(() => {
    const cartItemCategories = food_list
        .filter(item => cartItems[item._id]) // Get only items present in the cart
        .map(item => item.category); // Extract their categories

    const related = food_list.filter(
        item => cartItemCategories.includes(item.category) && !cartItems[item._id] // Exclude items already in the cart
    );

    setRelatedItems(related.slice(0, 5)); // Limit to 5 related items
}, [cartItems, food_list]);

  return (
    <div className="cart">
      <h2>My Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {food_list.map((item) => {
            const itemId = item._id;
            const selectedSize = selectedSizes[itemId] || 'Regular';
            if (cartItems[itemId] > 0) {
              const priceForSelectedSize = getPriceForSize(item, selectedSize);
              return (
                <tr key={itemId}>
                  <td>
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="mycart-item-image"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td className="quantity-cell">
                    <FaMinus
                      className="quantity-btn"
                      onClick={() => removeFromCart(itemId)}
                      style={{ cursor: 'pointer', color: 'black' }}
                    />
                    <span className="mx-3">{cartItems[itemId]}</span>
                    <IoMdAdd
                      className="quantity-btn"
                      onClick={() => addToCart(itemId)}
                      style={{ cursor: 'pointer', color: 'black' }}
                    />
                  </td>
                  <td>${(priceForSelectedSize * cartItems[itemId]).toFixed(2)}</td>
                </tr>
              );
            }
            return null;
          })}

          {/* Order Summary Row */}
          <tr className="summary-row">
            
            <td className="summary-label">Subtotal</td>
            <td>${getTotalCartAmount().toFixed(2)}</td>
          
           
            <td className="summary-label">Delivery Fee</td>
            <td>${deliveryFee.toFixed(2)}</td>
          </tr>
          <tr className="summary-row total-row">
            <td colSpan="2"></td>
            <td className="summary-label">Total</td>
            <td>${totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="checkout-container text-center">
        <Button variant="warning" className="header-button" onClick={()=> navigate('/order')}>Confirm</Button>
      </div>
      <h2>More Foods</h2>
      
      {/* Related Items Section */}
      {relatedItems.length > 0 && (
          <div className="related-items-section py-2">
             
             
             

<Row className="gx-3 gy-4">
            {/* Render Category Cards */}
            {relatedItems.slice(0, 3).map((item) => (
              <Col key={item._id} xs={12} md={6} lg={4} >
                <Card
                  className="category-card related-item mx-auto"
                  // onClick={() => handleCategoryChange(item._id)}
                  style={{ cursor: 'pointer', margin: 0, padding: 0, }}
                >
                  <Card.Img
                    variant="top"
                    src={`${url}/images/${item.image}`}
                    className="img"
                    style={{ height: '120px', minWidth: '100%', objectFit: 'cover', border: 0, }}
                  />
                  <Card.Body className="text-center"
                  style={{height: '20px', overflow: 'hidden'}}>
                    <Card.Title>{item.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
             
          </div>
      )}
    </div>
  );
};

export default MyCart;
