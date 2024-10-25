import React, { useContext, useState, useEffect } from 'react';
import { useStripe, Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../components/context/StoreContext';
import './PlaceOrder.css';
import { loadStripe } from '@stripe/stripe-js';
import { Container } from 'react-bootstrap';
import BreadcrumbNav from '../../components/BreadcrumbNav/BreadcrumbNav';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51PE9CHP3pfdxJbgF5ker5xndIu2jPWDuoyamZlx6aKf1eRX1oIixcaFm5HmAPEB4pymxSkazLWqZFT92BiO5Zjd900J1kMH5KL');

const CheckoutForm = () => {
    const stripe = useStripe();
    const navigate = useNavigate();
    const { getTotalCartAmount, token, setToken, food_list, cartItems, url, updateBreadcrumbs } = useContext(StoreContext);
    const totalAmount = getTotalCartAmount().toFixed(2);
    
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        amount: totalAmount,
    });

    // Handle input changes
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Check token, cart amount, and session ID on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            setToken(storedToken);
        }

        if (!storedToken) {
            alert("Please Login First to place Order...");
            navigate('/my-cart');
        } else if (totalAmount === '0.00') {
            alert("Please add some items to cart to place order...");
            navigate('/my-cart');
        }


        const newBreadcrumb = { label: 'Checkout', href: '/order' };

    updateBreadcrumbs((prevBreadcrumbs) => [
      ...prevBreadcrumbs.filter(item => item.label !== 'Checkout'), // Remove any existing category breadcrumb
      newBreadcrumb, // Add the new active category
    ]);
    }, [token, totalAmount, navigate, setToken, updateBreadcrumbs]);

    const submitOrder = async (orderData) => {
      console.log('Cart Items:', cartItems); // Check cart items
      const token = localStorage.getItem('token');
  
      // Build products from cart items
      const products = Object.keys(cartItems.items || {}).reduce((acc, itemKey) => {
          const itemQuantity = cartItems.items[itemKey];
          const [itemId, selectedSizeKey] = itemKey.split('-'); // Extract itemId and selectedSizeKey from itemKey
  
          if (itemQuantity > 0) {
              const item = food_list.find((item) => item._id === itemId);
              if (item) {
                  // Determine the selected size
                  const selectedSize = cartItems.selectedSizes[selectedSizeKey]; // Get the size object using selectedSizeKey
  
                  // Check if selectedSize is an object and extract size and price
                  let size = '';
                  let price = 0;
  
                  if (typeof selectedSize === 'object' && selectedSize !== null) {
                      size = selectedSize.size || ''; // Assuming 'size' is the property name
                      price = selectedSize.price || item.price; // Fallback to item price if size object does not have a price
                  } else {
                      size = selectedSize; // Fallback to the string value
                      price = item.price; // Default price from item
                  }
  
                  // Add the item to the products array
                  acc.push({
                      itemId: item._id,
                      name: item.name,
                      description: item.description || '',
                      quantity: itemQuantity,
                      price: price, // Ensure price is included
                      size: size, // Ensure size is included
                  });
                  console.log(`Item added to order: ${item.name}, Quantity: ${itemQuantity}, Size: ${size}, Price: ${price}`); // Log item details
              } else {
                  console.warn(`Item with ID ${itemId} not found in food_list.`);
              }
          }
          return acc;
      }, []);
  
      console.log('Products:', products); // Log the products array
  
      // Ensure products is populated before proceeding
      if (products.length === 0) {
          alert("No items in the cart. Please add items to your cart before placing an order.");
          return; // Stop execution if no items
      }
  
      const orderDataWithItems = {
          ...orderData,
          items: products,
      };
  
      try {
          console.log('Order Data:', orderDataWithItems); // Log the order data before sending
          const response = await axios.post(`${url}/api/order/place`, orderDataWithItems, {
            
                headers: { Authorization: `Bearer ${token}` },
            
          });
  
          console.log('Order Response:', response.data); // Log the response from the order submission
  
          if (response.data.success) {
              const { sessionId } = response.data;
              const result = await stripe.redirectToCheckout({ sessionId });
  
              if (result.error) {
                  console.error('Checkout error:', result.error.message);
                  alert(result.error.message);
              }
          } else {
              alert("Error submitting order. Please try again.");
          }
      } catch (error) {
          console.error("Error submitting order:", error);
          alert("Error submitting order. Please try again.");
      }
  };
  
  
    // Place order handler
    const placeOrder = async (event) => {
        event.preventDefault();
        const orderId = await submitOrder(data);
        if (orderId) {
            await makePayment(orderId);
        }
    };


    return (
        <Container>

                <BreadcrumbNav  /> 


            
            <form onSubmit={placeOrder} className="place-order mt-5">
                <div className="place-order-left">
                    <h3 className="title pb-3">Order Details</h3>
                    <label>
                        Street Address
                        <input
                            required
                            name="address"
                            onChange={onChangeHandler}
                            value={data.address}
                            type="text"
                            placeholder="Street Address"
                        />
                    </label>
                    <label>
                        Town/City
                        <input
                            required
                            name="city"
                            onChange={onChangeHandler}
                            value={data.city}
                            type="text"
                            placeholder="City"
                        />
                    </label>
                    <label>
                        Phone Number
                        <input
                            required
                            name="phone"
                            onChange={onChangeHandler}
                            value={data.phone}
                            type="text"
                            placeholder="Phone Number"
                        />
                    </label>
                    <h4 className="title mt-2 pb-2">Payment Information</h4>
                    <label>
                        Email
                        <input
                            required
                            name="email"
                            onChange={onChangeHandler}
                            value={data.email}
                            type="email"
                            placeholder="Email"
                        />
                    </label>
                    <label>
                        Card Holder Name
                        <input
                            required
                            name="firstName"
                            onChange={onChangeHandler}
                            value={data.firstName}
                            type="text"
                            placeholder="First Name"
                        />
                    </label>
                    <label>
                        Last Name
                        <input
                            required
                            name="lastName"
                            onChange={onChangeHandler}
                            value={data.lastName}
                            type="text"
                            placeholder="Last Name"
                        />
                    </label>
                    <button type="submit" className="header-button confirm-button">
                        Confirm
                    </button>
                </div>

                <div className="place-order-right">
    <h2 className="text-center mt-4">Cart Summary</h2>
    <div>
        {Object.keys(cartItems.items || {}).map((key) => {
            const [itemId, selectedSizeKey] = key.split('-'); // Extract itemId and selectedSizeKey
            const item = food_list.find((item) => item._id === itemId); // Find the item based on ID
            const quantity = cartItems.items[key]; // Get the quantity from cartItems

            if (!item || quantity <= 0) return null; // Skip if no item or quantity is 0

           // Get the price for the selected size
const sizeObject = item.sizes.find((size) => size.size === selectedSizeKey); // Now using selectedSizeKey

// Use the first size if selectedSize is not found
const price = sizeObject ? sizeObject.price : (item.sizes.length > 0 ? item.sizes[0].price : 0); // Get price for the selected size or fallback to first size

            return (
                item && quantity > 0 && (
                    <div key={key} className="summary-item">
                        <img src={`${url}/images/${item.image}`} className='d-none' alt={item.name} />
                        <div className="summary-details">
                            <h5>{item.name}</h5>
                            <p>Price: ₩{price.toFixed(2)}</p> {/* Show the correct price for selected size */}
                            <p>Quantity: {quantity}</p>
                        </div>
                    </div>
                )
            );
        })}
    </div>
    <h4>Total: ₩{totalAmount}</h4>
</div>

            </form>
        </Container>
    );
};

// Wrap the component with Stripe Elements provider
const PlaceOrder = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default PlaceOrder;
