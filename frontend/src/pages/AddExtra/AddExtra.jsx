// AddExtra.js
import React, { useContext, useState, useEffect } from 'react';
import './AddExtra.css';
import { StoreContext } from '../../components/context/StoreContext';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import FoodItem from '../../components/FoodItem/FoodItem';

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
  const [selectedAddon, setSelectedAddon] = useState(null); // State for selected addon
  const [selectedDrink, setSelectedDrink] = useState(null); // State for selected drink
  const [relatedItems, setRelatedItems] = useState([]);

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

  // Function to handle addon selection
  const handleAddonSelection = (addonId) => {
    setSelectedAddon(addonId); // Set the selected addon
  };

  // Function to handle drink selection
  const handleDrinkSelection = (drinkId) => {
    setSelectedDrink(drinkId); // Set the selected drink
  };

  return (
    <div className='add-extra p-2'>
      
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
                <Container className='p-4'>

                  <Row className="add-extra-items-title add-extra-items-item align-items-center g-5">
                    {/* Image Section */}
                    <Col xs={12} md={6} className="text-center">
                      <img
                        src={`${url}/images/${item.image}`}
                        alt={item.name}
                        className="cart-item-image img-fluid"
                      />
                    </Col>

                    {/* Item Details Section */}
                    <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-start">
                      <p className="item-name text-center text-md-start">{item.name}</p>
                      <p className="item-price text-center text-md-start">${priceForSelectedSize.toFixed(2)}</p>
                      <p className="item-desc text-center text-md-start">{item.description}</p>

                      {/* Quantity Counter */}
                      <div className="item-quantity-counter d-flex align-items-center gap-3 mt-3">
                        <FaMinus
                          className="quantity-btn"
                          onClick={() => removeFromCart(itemId)}
                          style={{ cursor: 'pointer', color: 'black' }}
                        />
                        <p className="mt-3">{cartItems[itemId]}</p>
                        <IoMdAdd
                          className="quantity-btn"
                          onClick={() => addToCart(itemId)}
                          style={{ cursor: 'pointer', color: 'black' }}
                        />
                      </div>

                      <p className="mt-3 d-none text-center text-md-start">
                        Total: ${(priceForSelectedSize * cartItems[itemId]).toFixed(2)}
                      </p>
                    </Col>
                  </Row>
                </Container>


                {/* Size Selection */}
                <Container fluid className='size-selection p-5'>
                  <Row>
                    <h4>Combo Size</h4>
                    {item.sizes.map((sizeObj) => (
                      <Col key={sizeObj.size} lg={4} className="size-option mx-2 ">
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
        <Row className='p-5 p-sm-0'>
          {food_list
            .filter((item) => item.category === '6700f136ded0621ea8687d74')
            .map((extra) => (
              <Col key={extra._id} lg={6} className="extra-item d-flex align-items-center">
                <div className='my-3'>
                <input
                  type="radio"
                  name="dipSelection"
                  value={extra._id}
                  checked={selectedExtra === extra._id}
                  onChange={() => handleExtraSelection(extra._id)}
                  className="extra-custom-radio"
                />
                 <img
                            src={`${url}/images/${extra.image}`}
                            alt={extra.name}
                            className="extra-item-image mx-3"
                          />
                  <span className="dip-label ">
                    {extra.name}
                   
                    <span className='mx-2'>
                      {extra.price ? `$${extra.price.toFixed(2)}` : '$5'}
                    </span>
                  </span>
                  </div>
              </Col>
            ))}
        </Row>
      </Container>

      <Container className='pt-0 mt-0'>
        {/* Spicy Level Selection */}
        <h3>Spices Option</h3>
        <div className="spicy-level-container pt-4">
          {["Mild", "Spicy Mild", "Spicy", "Extra Spicy"].map((level) => (
            <>
              <label key={level} className="spicy-label">
                <input
                  type="radio"
                  value={level}
                  checked={selectedSpicyLevel === level}
                  onChange={() => handleSpicyChange(level)}
                  className='extra-custom-radio me-5 '
                />
                {level} Spicy
              </label>

            </>
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
              .filter((addon) =>
                // Show only items present in the cart
                cartItems[addon._id] &&
                addon.category !== '6700f136ded0621ea8687d74' &&  // Exclude extras
                addon.category !== '6700f0eaded0621ea8687d72'     // Exclude drinks
              )
              .map((addon) => (
                <div key={addon._id}>
                  <input
                    type="radio" // Changed back to radio for single selection
                    name="addons" // Ensure all radios have the same name for grouping
                    value={addon._id}
                    className="addons-radio"
                    id={`addon-${addon._id}`}
                    checked={selectedAddon === addon._id} // Check if this addon is selected
                    onChange={() => handleAddonSelection(addon._id)} // Update selection
                  />
                  <label htmlFor={`addon-${addon._id}`}>{addon.name}</label>
                </div>
              ))}
          </Col>

          {/* Choose Drink Column */}
          <Col lg={6} className="drinks-column">
            <h3>Choose Drink</h3>
            {food_list
              .filter((item) => item.category === '6700f0eaded0621ea8687d72')
              .map((drink) => (
                <div key={drink._id}>
                  <input
                    type="radio" // Changed back to radio for single selection
                    name="drinks" // Ensure all radios have the same name for grouping
                    value={drink._id}
                    className="drinks-radio"
                    id={`drink-${drink._id}`}
                    checked={selectedDrink === drink._id} // Check if this drink is selected
                    onChange={() => handleDrinkSelection(drink._id)} // Update selection
                  />
                  <label htmlFor={`drink-${drink._id}`}>{drink.name}</label>
                </div>
              ))}
          </Col>
        </Row>
      </Container>

      {/* View Cart Button */}
      <Container className="view-cart-button-container mt-4 text-center">
        <Button
          variant="warning"
          className="header-button "
          onClick={() => {
            // Logic to view the cart or proceed to checkout
            navigate('/my-cart');
          }}
        >
          View Cart
        </Button>
      </Container>

      <Container className='my-2'>
        
      <h2>Related Items</h2>
      
      {/* Related Items Section */}
      {relatedItems.length > 0 && (
          <div className="related-items-section">
             
             
             

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
      </Container>
    </div>
  );
};

export default AddExtra;
