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
    paymentMethod: "" // Add this line to track payment method
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert('Error');
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PE9CHP3pfdxJbgF5ker5xndIu2jPWDuoyamZlx6aKf1eRX1oIixcaFm5HmAPEB4pymxSkazLWqZFT92BiO5Zjd900J1kMH5KL");

   

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right"> {/* Corrected div class name */}
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <div className="payment-method">
            <h4 className="title">Payment Method</h4>
            <div className="payment-methods">
              <div>
              <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={data.paymentMethod === 'paypal'}
                    onChange={() => {
                      setShowCard(false);
                      onChangeHandler({ target: { name: 'paymentMethod', value: 'paypal' } });
                    }}
                  />
                  Cash on Delivery
                </label>
              </div>
              <div>

                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={data.paymentMethod === 'creditCard'}
                    onChange={() => {
                      setShowCard(true);
                      onChangeHandler({ target: { name: 'paymentMethod', value: 'creditCard' } });
                    }}
                  />
                  Visa Card
                </label>

                    

                    </div>

                    <div>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debitCard"
                    checked={data.paymentMethod === 'debitCard'}
                    onChange={() => {
                      setShowCard(true);
                      onChangeHandler({ target: { name: 'paymentMethod', value: 'debitCard' } });
                    }}
                  />
                  Debit Card
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="masterCard"
                    checked={data.paymentMethod === 'masterCard'}
                    onChange={() => {
                      setShowCard(true);
                      onChangeHandler({ target: { name: 'paymentMethod', value: 'masterCard' } });
                    }}
                  />
                  Master Card
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="googlePay"
                    checked={data.paymentMethod === 'googlePay'}
                    onChange={() => {
                      setShowCard(true);
                      onChangeHandler({ target: { name: 'paymentMethod', value: 'googlePay' } });
                    }}
                  />
                  Google Pay Card
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="applePay"
                    checked={data.paymentMethod === 'applePay'}
                    onChange={() => {
                      setShowCard(true);
                      onChangeHandler({ target: { name: 'paymentMethod', value: 'applePay' } });
                    }}
                  />
                  Apple Pay
                </label>
              </div>

              {showCard && ( // Changed to just showCard
                <div>
                  <div className="multi-fields">
          <input required name='accounttitle' onChange={onChangeHandler} value={data.accountTitle} type="text" placeholder='Account Title' />
          <input required name='expDate' onChange={onChangeHandler} value={data.expDate} type="date" placeholder='Date' />
        </div>
                   
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={makePayment}
            // onClick={()=> navigate('/order')}
          >Pay</button>

          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}
}
export default PlaceOrder;
