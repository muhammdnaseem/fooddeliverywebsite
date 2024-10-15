import React, { useContext, useState, useEffect } from 'react';
import './AddExtra.css';
import { StoreContext } from '../../components/context/StoreContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Cart = () => {
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



  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size
  const [selectedExtra, setSelectedExtra] = useState(null); // State to track the selected extra (dip)

  useEffect(() => {
    // Set the default size to the first item's size when the component mounts
    const firstItem = food_list[0]; // Get the first item in the food_list
    if (firstItem && firstItem.sizes.length > 0) {
      setSelectedSize(firstItem.sizes[0].size); // Set the first size as selected
    }
  }, [food_list]); // Dependency array ensures this runs when food_list changes

  // Handle spicy level change
  const handleSpicyChange = (level) => setSelectedSpicyLevel(level);

  // Get the price for the selected size
  const getPriceForSize = (item, size) => {
    const sizeObj = item.sizes.find((s) => s.size === size);
    return sizeObj ? sizeObj.price : 0;
  };

  // Handle adding a new extra (dip) by ensuring only one is selected at a time
  const handleExtraSelection = (extraId) => {
    if (selectedExtra) {
      removeFromCart(selectedExtra); // Remove the previously selected extra
    }
    addToCart(extraId, 1); // Add the new extra
    setSelectedExtra(extraId); // Set this extra as the selected one
  };

  return (
    <div className='add-extra'>
      <div className="add-extra-items">
        {food_list.map((item) => {
          const itemId = item._id;
          const selectedSize = selectedSizes[itemId] || 'Regular';

          if (cartItems[itemId] > 0) {
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
               

                {/* Size Selection Radio Buttons in Columns */}
                <Container className='size-selection p-5'>
                  <Row>
                    <h4>Combo Size</h4>
                    {item.sizes.map((sizeObj) => (
                      <Col key={sizeObj.size} lg={4} className="size-option mx-2">
                        <input
                          type="radio"
                          name={`size-${itemId}`} // Group by item ID
                          value={sizeObj.size}
                          checked={selectedSize === sizeObj.size}
                          onChange={(e) => handleSizeChange(itemId, selectedSize, e.target.value)}
                          className="custom-radio"
                          id={`size-${itemId}-${sizeObj.size}`} // Unique ID for label binding
                        />
                        <label htmlFor={`size-${itemId}-${sizeObj.size}`} className="custom-radio-label">
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

                {/* Extra Items Section */}
                <Container className='py-5 pt-5'>
             
                    <h3>Choose your Dip</h3>
                    <Row className='p-5'>
                    {food_list
  .filter((item) => item.category === '6700f136ded0621ea8687d74')
  .map((extra) => {
    console.log(extra); // Check if the price exists for each extra item
    return (
      <Col key={extra._id} lg={6} className="extra-item d-flex align-items-center">
        <input
          type="radio"
          name="dipSelection"
          value={extra._id}
          checked={selectedExtra === extra._id}
          onChange={() => handleExtraSelection(extra._id)}
          className="extra-custom-radio"
        />
       <label className="extra-custom-radio-label d-flex justify-content-between align-items-center w-100">
       <span className="size-label mx-auto">
  {extra.name}
  &nbsp;&nbsp;&nbsp; {/* Add as many as you need */}
  <span>
    {extra.price ? `${extra.price.toFixed(2)}` : '$5'}
  </span>
</span>

</label>


      </Col>
    );
  })}

                    </Row>
                  
                </Container>

                <Container className='pt-0 mt-0'>

    {/* Spicy Level Selection */}
    <h3>Spices Option</h3>
  
      
      <div className="spicy-level-container pt-4"> {/* Add this wrapper for the radio buttons */}
        {["Mild", "Spicy Mild", "Spicy", "Extra Spicy"].map((level) => (
          <label key={level} className="spicy-label"> {/* Add a class for styling */}
            <input
              type="radio"
              value={level}
              checked={selectedSpicyLevel === level}
              onChange={() => handleSpicyChange(level)}
              className='me-5'
            />
            {level} Spicy
          </label>
        ))}
      </div>
  
  
</Container>
<Container className='pt-4'>
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
          {Object.keys(cartItems).map((itemId) => {
            const item = food_list.find((food) => food._id === itemId);
            // Filter out extra and drinks categories
            if (item && item.category !== '6700f136ded0621ea8687d74' && item.category !== '6700f0eaded0621ea8687d72') {
              return (
                <div key={itemId}>
                  <input
                    type="radio"
                    name="addons"
                    value={itemId}
                    className="addons-radio"
                    id={`addon-${itemId}`}
                  />
                  <label htmlFor={`addon-${itemId}`}>{item.name}</label>
                </div>
              );
            }
            return null;
          })}
        </Col>

        {/* Choose Drink Column */}
        <Col lg={6} className="drinks-column">
          <h3>Choose Drink</h3>
          {food_list
            .filter((item) => item.category === '6700f0eaded0621ea8687d72') // Assuming 'drinks' is the category ID for drinks
            .map((drink) => (
              <div key={drink._id}>
                <input
                  type="radio"
                  name="drinks"
                  value={drink._id}
                  className="drinks-radio"
                  id={`drink-${drink._id}`}
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
          .filter((item) => item.isRelated) // Assuming isRelated is a flag to determine related items
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
              />
              <label htmlFor={`related-${relatedItem._id}`}>Select</label>
            </Col>
          ))}
      </Row>
    </Container>

   
      <Button variant="warning"  className="header-button ms-auto px-5" onClick="">
        View Cart
      </Button>
   


              </div>
            );
          }
          return null; // Skip items not in the cart
        })}
      </div>

      

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

export default Cart;
