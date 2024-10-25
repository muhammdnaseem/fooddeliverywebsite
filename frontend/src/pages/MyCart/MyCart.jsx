import React, { useContext, useState, useEffect } from 'react';
import './MyCart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import BreadcrumbNav from '../../components/BreadcrumbNav/BreadcrumbNav';

const MyCart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
    token,
    updateBreadcrumbs,

  } = useContext(StoreContext);

  const { selectedSizes = {}, items = {} } = cartItems || {};
  
  const [relatedItems, setRelatedItems] = useState([]);
  const navigate = useNavigate();

  // Function to get the price based on the selected size
  const getPriceForSize = (item, size) => {
    const sizeObj = item.sizes.find((s) => s.size === size);
    return sizeObj ? sizeObj.price : 0;
  };

  // Function to get the default size if no size is selected
  const getDefaultSize = (item) => {
    return item.sizes.length > 0 ? item.sizes[0].size : null;
  };

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2.0;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  useEffect(() => {
    const cartItemCategories = food_list
      .filter(item => cartItems[item._id])
      .map(item => item.category);

    const related = food_list.filter(
      item => cartItemCategories.includes(item.category) && !cartItems[item._id]
    );

    setRelatedItems(related.slice(0, 5));

    const newBreadcrumb = { label: 'My Cart', href: '/my-cart' };

    updateBreadcrumbs((prevBreadcrumbs) => [
      ...prevBreadcrumbs.filter(item => item.label !== 'My Cart'), // Remove any existing category breadcrumb
      newBreadcrumb, // Add the new active category
    ]);
  }, [cartItems, food_list, updateBreadcrumbs]);





  return (
    <div className="cart">
      <BreadcrumbNav /> 
     
      <table className="cart-table mt-5">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items).map((key) => {
            
            const quantity = items[key]; // Get the quantity directly from items
            const [itemId, size] = key.split('-'); // Split the key to get itemId and size
            const foodItem = food_list.find(food => food._id === itemId); // Find the food item

            if (!foodItem || quantity === 0) {
              return null; // Skip if no food item or quantity is 0
            }
             
           // Safely get the first size if no size is provided
    const validSize = size || foodItem.sizes?.[0]?.size || 'Default'; 
    const price = getPriceForSize(foodItem, validSize); 
    const subtotal = (price * quantity).toFixed(2); // Calculate subtotal
            return (
              <tr key={key}>
                <td>
                  <img
                    src={`${url}/images/${foodItem.image}`}
                    alt={foodItem.name}
                    className="mycart-item-image"
                  />
                </td>
                <td>{foodItem.name}</td>
                <td className="quantity-cell">
                  <FaMinus
                    className="quantity-btn"
                    onClick={() => {
                      // Remove from cart, ensure size is passed correctly
                      const currentSize = selectedSizes[itemId] || getDefaultSize(foodItem);
                      if (currentSize) {
                        removeFromCart(itemId, currentSize);
                      } else {
                        console.error("Size is missing for the item.");
                      }
                    }}
                    style={{ cursor: 'pointer', color: 'black' }}
                  />
                  <span className="mx-3">{quantity}</span>
                  <IoMdAdd
                    className="quantity-btn"
                    onClick={() => {
                      // Check if user is logged in and size is selected
                      const selectedSize = selectedSizes[itemId] || getDefaultSize(foodItem);
                      if (token && selectedSize) {
                        addToCart(itemId, selectedSize);
                      } else {
                        console.error("User not logged in or selected size is missing.");
                      }
                    }}
                    style={{ cursor: 'pointer', color: 'black' }}
                  />
                </td>
                <td>${subtotal}</td>
              </tr>
            );
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
        <Button variant="warning" className="header-button" onClick={() => navigate('/order')}>Confirm</Button>
      </div>

      <h2>More Foods</h2>
      {relatedItems.length > 0 && (
        <div className="related-items-section py-2">
          <Row className="gx-3 gy-4">
            {relatedItems.slice(0, 3).map((item) => (
              <Col key={item._id} xs={12} md={6} lg={4}>
                <Card
                  className="category-card related-item mx-auto"
                  style={{ cursor: 'pointer', margin: 0, padding: 0 }}
                >
                  <Card.Img
                    variant="top"
                    src={`${url}/images/${item.image}`}
                    className="img"
                    style={{
                      height: '120px',
                      minWidth: '100%',
                      objectFit: 'cover',
                      border: 0,
                      borderRadius: '40px',
                    }}
                  />
                  <Card.Body className="text-center" style={{ height: '20px', overflow: 'hidden' }}>
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
