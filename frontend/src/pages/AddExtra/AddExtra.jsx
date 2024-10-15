// AddExtra.js
import React, { useContext, useState, useEffect } from 'react';
import './AddExtra.css';
import { StoreContext } from '../../components/context/StoreContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate, useLocation, } from 'react-router-dom';

const AddExtra = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    selectedSizes,
    handleSizeChange,
    url
  } = useContext(StoreContext);

  const location = useLocation(); // Access location object
  const selectedItemId = location.state?.itemId; // Extract itemId from state

  const navigate = useNavigate(); // Initialize navigate
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState("Mild"); // Default spicy level
  const [selectedExtra, setSelectedExtra] = useState(null); // State to track the selected extra (dip)

  useEffect(() => {
    // Setting default size selections when component mounts
    food_list.forEach((item) => {
      if (item.sizes.length > 0 && !selectedSizes[item._id]) {
        handleSizeChange(item._id, selectedSizes[item._id], item.sizes[0].size); // Set first size as selected if not already set
      }
    });

    // Setting default extra selection
    const firstExtra = food_list.find(item => item.category === '6700f136ded0621ea8687d74');
    if (firstExtra && !selectedExtra) {
      setSelectedExtra(firstExtra._id); // Set the first extra as selected
      addToCart(firstExtra._id, 1); // Add the first extra to cart
    }
  }, [food_list, selectedSizes, selectedExtra, addToCart, handleSizeChange]);

  // Handle spicy level change
  const handleSpicyChange = (level) => setSelectedSpicyLevel(level);

  // Get the price for the selected size
  const getPriceForSize = (item, size) => {
    const sizeObj = item.sizes.find((s) => s.size === size);
    return sizeObj ? sizeObj.price : 0;
  };

  // Handle adding a new extra (dip) by ensuring only one is selected at a time
  const handleExtraSelection = (extraId) => {
    if (selectedExtra && selectedExtra !== extraId) {
      removeFromCart(selectedExtra); // Remove the previously selected extra
    }
    if (selectedExtra !== extraId) {
      addToCart(extraId, 1); // Add the new extra
      setSelectedExtra(extraId); // Set this extra as the selected one
    }
  };

  return (
    <div className='add-extra'>
      {/* Cart Items Section */}
      <div className="add-extra-items">
        {Object.keys(cartItems).map((itemId) => {
         if (itemId === selectedItemId) {
          const item = food_list.find((food) => food._id === itemId);
          
          if (!item || cartItems[itemId] <= 0) return null; // Skip if item is not in cart

          const selectedSize = selectedSizes[itemId] || (item.sizes.length > 0 ? item.sizes[0].size : 'Regular');
          const priceForSelectedSize = getPriceForSize(item, selectedSize);

          return (
            <div key={itemId} className="cart-item">
              <Row className="add-extra-items-title add-extra-items-item">
                <Col lg={6} className='text-center'>
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </Col>
                <Col lg={6}>
                  <p className='item-name'>{item.name}</p>
                  <p className='item-price'>${priceForSelectedSize.toFixed(2)}</p>
                  <p className='item-desc'>{item.description}</p>

                  {/* Quantity Counter */}
                  <div className="item-quantity-counter">
                    <FaMinus
                      className='quantity-btn'
                      onClick={() => removeFromCart(itemId)}
                      style={{ cursor: 'pointer', color: 'black' }}
                    />
                    <p className='mt-3'>{cartItems[itemId]}</p>
                    <IoMdAdd
                      className='quantity-btn'
                      onClick={() => addToCart(itemId)}
                      style={{ cursor: 'pointer', color: 'black' }}
                    />
                  </div>

                  <p>Total: ${(priceForSelectedSize * cartItems[itemId]).toFixed(2)}</p>
                </Col>
              </Row>

              {/* Size Selection */}
              <Container className='size-selection p-5'>
                <Row>
                  <h4>Combo Size</h4>
                  {item.sizes.map((sizeObj) => (
                    <Col key={sizeObj.size} lg={4} className="size-option mx-2">
                      <input
                        type="radio"
                        name={`size-${itemId}`} // Group sizes by item ID
                        value={sizeObj.size}
                        checked={selectedSizes[itemId] === sizeObj.size}
                        onChange={() =>
                          handleSizeChange(itemId, selectedSizes[itemId], sizeObj.size)
                        }
                        className="custom-radio"
                        id={`size-${itemId}-${sizeObj.size}`}
                      />
                      <label
                        htmlFor={`size-${itemId}-${sizeObj.size}`}
                        className="custom-radio-label"
                      >
                        <img
                          src={`${url}/images/${item.image}`}
                          alt={item.name}
                          className="size-item-image"
                        />
                        <span className="size-label">{sizeObj.size}</span>
                      </label>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          );
        }
        })}
      </div>

      {/* Options Sections - Rendered Only Once */}
      <Container className='py-5 pt-5'>
        {/* Dip Selection */}
        <h3>Choose your Dip</h3>
        <Row className='p-5'>
          {food_list
            .filter((item) => item.category === '6700f136ded0621ea8687d74')
            .map((extra) => (
              <Col key={extra._id} lg={6} className="extra-item d-flex align-items-center">
                <input
                  type="radio"
                  name="dipSelection"
                  value={extra._id}
                  checked={selectedExtra === extra._id}
                  onChange={() => handleExtraSelection(extra._id)}
                  className="extra-custom-radio me-5"
                />
                <label className="extra-custom-radio-label d-flex justify-content-between align-items-center w-100">
                  <span className="size-label mx-auto">
                    {extra.name}
                    &nbsp;&nbsp;&nbsp;
                    <span>
                      {extra.price ? `$${extra.price.toFixed(2)}` : '$5'}
                    </span>
                  </span>
                </label>
              </Col>
            ))}
        </Row>
      </Container>

      <Container className='pt-0 mt-0'>
        {/* Spicy Level Selection */}
        <h3>Spices Option</h3>
        <div className="spicy-level-container pt-4">
          {["Mild", "Spicy Mild", "Spicy", "Extra Spicy"].map((level) => (
            <label key={level} className="spicy-label">
              <input
                type="radio"
                value={level}
                checked={selectedSpicyLevel === level}
                onChange={() => handleSpicyChange(level)}
                className='extra-custom-radio me-5'
              />
              {level} Spicy
            </label>
          ))}
        </div>
      </Container>

      <Container className='pt-4'>
        {/* Special Instructions */}
        <div className="special-instructions">
          <h3>Special Instructions</h3>
          <textarea
            rows="6"
            placeholder="Add any special instructions here..."
            className="special-instructions-input"
          ></textarea>
        </div>
      </Container>

      {/* Add Ons and Choose Drink Section */}
      <Container className="addons-drinks-section">
        <Row>
          {/* Add Ons Column */}
          <Col lg={6} className="addons-column">
            <h3>Add On</h3>
            {food_list
              .filter((item) => 
                // Exclude extras and drinks categories
                item.category !== '6700f136ded0621ea8687d74' && 
                item.category !== '6700f0eaded0621ea8687d72'
              )
              .map((addon) => (
                <div key={addon._id}>
                  <input
                    type="radio"
                    name="addons"
                    value={addon._id}
                    className="addons-radio"
                    id={`addon-${addon._id}`}
                    checked={cartItems[addon._id] > 0} // Check if addon is in cart
                    onChange={() => addToCart(addon._id)} // Add or remove addon
                  />
                  <label htmlFor={`addon-${addon._id}`}>{addon.name}</label>
                </div>
              ))}
          </Col>

          {/* Choose Drink Column */}
          <Col lg={6} className="drinks-column">
            <h3>Choose Drink</h3>
            {food_list
              .filter((item) => item.category === '6700f0eaded0621ea8687d72') // Drinks category
              .map((drink) => (
                <div key={drink._id}>
                  <input
                    type="radio"
                    name="drinks"
                    value={drink._id}
                    className="drinks-radio"
                    id={`drink-${drink._id}`}
                    checked={cartItems[drink._id] > 0} // Check if drink is in cart
                    onChange={() => addToCart(drink._id)} // Add or remove drink
                  />
                  <label htmlFor={`drink-${drink._id}`}>{drink.name}</label>
                </div>
              ))}
          </Col>
        </Row>
      </Container>

      {/* Related Items Section */}
      <Container className="related-items-section mt-4">
        <h3>Related Items</h3>
        <Row>
          {food_list
            .filter(item => item.isRelated) // Assuming isRelated flag determines related items
            .map((relatedItem) => (
              <Col key={relatedItem._id} lg={4} className="related-item">
                <img
                  src={`${url}/images/${relatedItem.image}`}
                  alt={relatedItem.name}
                  className="related-item-image"
                />
                <p>{relatedItem.name}</p>
                <p>${relatedItem.price.toFixed(2)}</p>
                <input
                  type="radio"
                  name="relatedItems"
                  value={relatedItem._id}
                  className="related-item-radio"
                  id={`related-${relatedItem._id}`}
                  checked={cartItems[relatedItem._id] > 0} // Check if related item is in cart
                  onChange={() => addToCart(relatedItem._id)} // Add or remove related item
                />
                <label htmlFor={`related-${relatedItem._id}`}>Select</label>
              </Col>
            ))}
        </Row>
      </Container>

      {/* View Cart Button */}
      <Container className='text-center'>
        <Button variant="warning" className="header-button" onClick={() => navigate('/my-cart')}>
          View Cart
        </Button>
      </Container>

      {/* Cart Total - Hidden by default */}
      <div className="add-extra-bottom d-none">
        <div className="add-extra-total">
          <h2>Cart Total</h2>
          <div>
            <div className="add-extra-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="add-extra-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="add-extra-total-detail">
              <b>Total</b>
              <b>${(getTotalCartAmount() + (getTotalCartAmount() > 0 ? 2 : 0)).toFixed(2)}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExtra;
