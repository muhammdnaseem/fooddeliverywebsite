import React, { useContext, useState, useEffect } from 'react';
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../components/context/StoreContext';
import './PlaceOrder.css';
import { loadStripe } from '@stripe/stripe-js'; 
import { Container } from 'react-bootstrap';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51PE9CHP3pfdxJbgF5ker5xndIu2jPWDuoyamZlx6aKf1eRX1oIixcaFm5HmAPEB4pymxSkazLWqZFT92BiO5Zjd900J1kMH5KL');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url, selectedSizes } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(()=>{
    if(!token){
      alert("Please Login First to place Order...");
      navigate('/my-cart');
    }else if(getTotalCartAmount()===0){
      alert("Please add some items to cart to place order...");
      navigate('/my-cart');
    }
  },[token])
  // **Updated Payment Function using makePayment**
  const makePayment = async () => {
    const stripe = await loadStripe(
      'pk_test_51PE9CHP3pfdxJbgF5ker5xndIu2jPWDuoyamZlx6aKf1eRX1oIixcaFm5HmAPEB4pymxSkazLWqZFT92BiO5Zjd900J1kMH5KL'
    );

    const products = Object.keys(cartItems).reduce((acc, itemId) => {
      const item = food_list.find((item) => item._id === itemId);
      if (cartItems[itemId] > 0) {
        const selectedSize = selectedSizes[itemId] || 'Regular';
        const price = item.price; // Adjust based on your size logic if needed

        acc.push({
          itemId: item._id,
          name: item.name,
          description: item.description || '',
          image: item.image,
          quantity: cartItems[itemId],
          price: price,
        });
      }
      return acc;
    }, []);

    const productItems = products.map((product) => ({
      price_data: {
        currency: 'krw',
        product_data: {
          name: product.name,
          description: product.description,
          images: [`${url}/images/${product.image}`],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const body = { productItems };

    try {
      const response = await fetch('http://localhost:4000/api/payment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const session = await response.json();
      console.log('Session from backend:', session);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Checkout error:', result.error.message);
      } else {
        alert('Order placed successfully!');
        navigate('/success');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    await makePayment(); // Use the custom payment function here
  };

  return (
    <Container>
      <h2>Checkout</h2>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title pb-3">Order Details</p>
          <label>
            Street Address
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
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

          <label>
            Notes for your order (Optional)
            <textarea
              rows="6"
              placeholder="Add any special instructions here..."
              className="special-instructions-input"
            ></textarea>
          </label>

          <h4 className="title mt-2 pb-2">Payment Information</h4>
          {/* Commented out manual card input */}
          {/* <label>
            Card Details
            <CardElement className="card-element" />
          </label> */}
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
            Country or Region
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
          <h2 className="text-center">Your Order</h2>
          <hr />
          {food_list.map(
            (item) =>
              cartItems[item._id] > 0 && (
                <div className="cart-total-detail" key={item._id}>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
              )
          )}
          <hr />
          <div className="cart-total-detail">
            <p><b>Sub Total</b></p>
            <p><b>${getTotalCartAmount().toFixed(2)}</b></p>
            
            
          </div>
          <hr />
          <div className="cart-total-detail">
            <p>Delivery Charges</p>
            <p>$2</p>
          </div>
          <hr />
          <div className="cart-total-detail">
            <p><b>Total</b></p>
            <p><b>${(getTotalCartAmount() + 2).toFixed(2)}</b></p>
            

          </div>
        </div>
      </form>
    </Container>
  );
};

const PlaceOrder = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PlaceOrder;
