import React, { useContext, useState, useEffect, useRef } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, selectedSizes, handleSizeChange, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState("0%"); // Track spicy level



   // Function to handle spicy level change
const handleSpicyChange = (level) => {
  setSelectedSpicyLevel(level); // Update selected spicy level
};

  // New Function to Display Extra Items
  const extraItems = food_list.filter(
    item => item.category === '6700f136ded0621ea8687d74' || item.category === '6700f0eaded0621ea8687d72'
  );
  console.log(extraItems);
  

  // Function to calculate the price based on the selected size
  const getPriceForSize = (item, size) => {
    const sizeObj = item.sizes.find((s) => s.size === size);
    return sizeObj ? sizeObj.price : 0; // Return the price or 0 if not found
  };

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PE9CHP3pfdxJbgF5ker5xndIu2jPWDuoyamZlx6aKf1eRX1oIixcaFm5HmAPEB4pymxSkazLWqZFT92BiO5Zjd900J1kMH5KL");

    // Prepare the products for payment
    const products = Object.keys(cartItems).reduce((acc, itemId) => {
        const item = food_list.find(item => item._id === itemId);
        if (cartItems[itemId] > 0) {
            const selectedSize = selectedSizes[itemId] || 'Regular'; // Default to 'Regular'
            const price = getPriceForSize(item, selectedSize); // Get price for the selected size
            
            acc.push({
                itemId: item._id,
                name: item.name,
                description: item.description || '',
                image: item.image,
                quantity: cartItems[itemId],
                price: price // Add price to the product object
            });
        }
        return acc;
    }, []);

    // Create line items for Stripe
    const productItems = products.map(product => ({
        price_data: {
          currency: 'krw', // Change to your currency
            product_data: {
                name: product.name, // Using the product name
                description: product.description, // Using the product description
                images: [`${url}/images/${product.image}`] // Include product image
            },
            unit_amount: product.price * 100, // Amount in cents
        },
        quantity: product.quantity,
    }));

    const body = {
        productItems // Use productItems for the request body
    };

   
    
    
    // Make the request to your backend payment API
    console.log(productItems); // Log line items for debugging
    const token = localStorage.getItem('token'); // or however you store the token

    console.log(token);

    const response = await fetch("http://localhost:4000/api/payment/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include token in the headers
        },
        body: JSON.stringify(body)
    });
    
    
    const session = await response.json();

    console.log("Session from backend:", session); // Log the session for debugging

    // Redirect to checkout
    const result = await stripe.redirectToCheckout({
        sessionId: session.id // Use sessionId from the response
        
    });
    const orderData = {
      userId: localStorage.getItem('userId'), // Assuming you have the userId stored
      items: products,
      amount: getTotalCartAmount() + 0, // Including delivery fee
      address: {}, // Add address data here
    };
    await submitOrder(orderData, true);
    
    if (result.error) {
        console.log(result.error); // Log the error if there's one
        const orderData = {
          userId: localStorage.getItem('userId'), // Assuming you have the userId stored
          items: products,
          amount: getTotalCartAmount() + 2, // Including delivery fee
          address: {}, // Add address data here
        };
        await submitOrder(orderData, false);
    }
};



// Create and add the Samsung Pay button when the client is ready


 // New function to submit order
 const submitOrder = async (orderData, payment) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  try {
    let response = await axios.post(url + '/api/order/place', { ...orderData, payment }, {
      headers: { token } // Include token in headers
    });
    console.log("Order submitted successfully:", response.data);
    navigate('/order'); // Redirect to order confirmation page
  } catch (error) {
    console.error("Error submitting order:", error);
  }
};







  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Size</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          const itemId = item._id;
          const selectedSize = selectedSizes[itemId] || 'Regular'; // Default size is 'Regular'

          if (cartItems[itemId] > 0) {
            const priceForSelectedSize = getPriceForSize(item, selectedSize); // Call the function here

            return (
              <div key={itemId}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  
                  {/* Dropdown for selecting size */}
                  <select
                    value={selectedSize}
                    onChange={(e) => handleSizeChange(itemId, selectedSize, e.target.value)}
                  >
                    {item.sizes.map((sizeObj) => (
                      <option key={sizeObj.size} value={sizeObj.size}>
                        {sizeObj.size}
                      </option>
                    ))}
                  </select>

                  <p>${priceForSelectedSize.toFixed(2)}</p>
                  <p>{cartItems[itemId]}</p>
                  <p>${(priceForSelectedSize * cartItems[itemId]).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(itemId, selectedSize)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }

          return null; // Skip items that are not in the cart
        })}
      </div>


      <div className="cart">
  <div className="cart-items">
    {/* Cart items here */}
  </div>

  <div className="cart-side-section">
    {/* Left side - Drinks items */}
    <div className="drinks-items-section">
      <h3>Drinks</h3>
      {food_list
        .filter((item) => item.category === '6700f0eaded0621ea8687d72')
        .map((drink) => (
          <div key={drink._id} className="drink-item">
            <img src={`${url}/images/${drink.image}`} className="drink-item-image" alt={drink.name} />
            <p>{drink.name}</p>
            <button onClick={() => addToCart(drink._id, 1)} className="drink-item-button">Add to Cart</button>
          </div>
        ))}
    </div>

    {/* Middle - Spicy level options */}
    <div className="spicy-level-options">
  <h3>Select Spicy Level</h3>

  <label>
    <input
      type="radio"
      value="0%"
      checked={selectedSpicyLevel === "0%"}
      onChange={() => handleSpicyChange("0%")}
    />
    0% Spicy
  </label>

  <label>
    <input
      type="radio"
      value="20%"
      checked={selectedSpicyLevel === "20%"}
      onChange={() => handleSpicyChange("20%")}
    />
    20% Spicy
  </label>

  <label>
    <input
      type="radio"
      value="40%"
      checked={selectedSpicyLevel === "40%"}
      onChange={() => handleSpicyChange("40%")}
    />
    40% Spicy
  </label>

  <label>
    <input
      type="radio"
      value="60%"
      checked={selectedSpicyLevel === "60%"}
      onChange={() => handleSpicyChange("60%")}
    />
    60% Spicy
  </label>

  <label>
    <input
      type="radio"
      value="80%"
      checked={selectedSpicyLevel === "80%"}
      onChange={() => handleSpicyChange("80%")}
    />
    80% Spicy
  </label>

  <label>
    <input
      type="radio"
      value="100%"
      checked={selectedSpicyLevel === "100%"}
      onChange={() => handleSpicyChange("100%")}
    />
    100% Spicy
  </label>
</div>

    {/* Right side - Extra items */}
    <div className="extra-items-section">
      <h3>Extras</h3>
      {food_list
        .filter((item) => item.category === '6700f136ded0621ea8687d74')
        .map((extra) => (
          <div key={extra._id} className="extra-item">
            <img src={`${url}/images/${extra.image}`} className="extra-item-image" alt={extra.name} />
            <p>{extra.name}</p>
            <button onClick={() => addToCart(extra._id, 1)} className="extra-item-button">Add to Cart</button>
          </div>
        ))}
    </div>
  </div>
</div>


   


      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2).toFixed(2)}</b>
            </div>
          </div>
           <button 
            onClick={makePayment}
            //  onClick={()=> navigate('/order')}
          >PROCEED TO CHECKOUT</button>
          {/*
          <button 
            onClick={makeBinancePayment}
            // onClick={()=> navigate('/order')}
          >PAY WITH BINANCE</button>
          

  <div align="center" id="samsungpay-container" ref={samsungPayContainerRef}></div>  */}

        </div>
      </div>
    </div>
  );
};

export default Cart;





