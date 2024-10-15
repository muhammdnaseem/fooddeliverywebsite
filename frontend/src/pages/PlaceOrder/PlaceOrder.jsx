import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [showCard, setShowCard] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    paymentMethod: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = food_list.filter((item) => cartItems[item._id] > 0).map((item) => ({
      ...item,
      quantity: cartItems[item._id]
    }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      const response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order. Please try again later.');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Order Details</p>
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street Address" />
        <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="Town/City" />
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone Number" />
        <textarea name="notes" onChange={onChangeHandler} value={data.notes} placeholder="Notes for your order (Optional)"></textarea>

        <h4 className="title">Payment</h4>
        <div className="payment-methods">
          <label>
            <input type="radio" name="paymentMethod" value="visa" onChange={onChangeHandler} />
            Visa
          </label>
          <label>
            <input type="radio" name="paymentMethod" value="mastercard" onChange={onChangeHandler} />
            MasterCard
          </label>
        </div>

        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" />
        <input required name="cardHolderName" onChange={onChangeHandler} value={data.cardHolderName} type="text" placeholder="Card Holder Name" />
        <button type="submit" className="confirm-button">Confirm</button>
      </div>

      <div className="place-order-right">
        <h2>Your Order</h2>
        {food_list.map((item) =>
          cartItems[item._id] > 0 && (
            <div className="cart-total-detail" key={item._id}>
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
          )
        )}
        <hr />
        <div className="cart-total-detail">
          <b>Sub Total</b>
          <b>${getTotalCartAmount()}</b>
        </div>
        <div className="cart-total-detail">
          <p>Delivery Charges</p>
          <p>$10</p>
        </div>
        <hr />
        <div className="cart-total-detail">
          <b>Total</b>
          <b>${getTotalCartAmount() + 10}</b>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
