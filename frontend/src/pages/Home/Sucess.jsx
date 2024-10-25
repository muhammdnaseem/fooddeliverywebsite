import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderConfirm from '../../components/OrderConfirm/OrderConfirm'; // Import the OrderConfirm component

const Success = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [popupMessage, setPopupMessage] = useState(''); // State to hold the message for the popup

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const sessionId = urlParams.get('session_id'); // Retrieve the session ID from the URL

    if (orderId && sessionId) {
      // Call the backend to verify the payment
      axios
        .get(`http://localhost:4000/api/order/verify-payment?orderId=${orderId}&sessionId=${sessionId}`)
        .then(response => {
          if (response.data.success) {
            setPaymentStatus('Payment Successful!');
            setPopupMessage('Payment Done!'); // Set the message for success
          } else {
            setPaymentStatus('Payment verification failed');
            setPopupMessage('Payment Failed'); // Set the message for failure
          }
          setShowPopup(true); // Show the popup after setting the message
        })
        .catch(error => {
          console.error('Error verifying payment:', error);
          setPaymentStatus('Payment verification failed');
          setPopupMessage('Payment Failed'); // Set the message for failure
          setShowPopup(true); // Show the popup in case of an error
        });
    } else {
      // Handle the case where orderId or sessionId is not present in the URL
      setPaymentStatus('Order ID or Session ID not found');
      setPopupMessage('Order ID or Session ID is missing. Please contact support.');
      setShowPopup(true); // Show the popup when either parameter is missing
    }
  }, []);

  return (
    <div>
      <OrderConfirm showPopup={showPopup} setShowPopup={setShowPopup} popupMessage={popupMessage} />
    </div>
  );
};

export default Success;
