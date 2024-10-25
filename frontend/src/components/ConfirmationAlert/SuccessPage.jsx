import React, { useState, useContext } from 'react';
import ConfirmationAlert from './ConfirmationAlert'; // Import the ConfirmationAlert
import { StoreContext } from '../context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const SuccessPage = () => {
  const [showPopup, setShowPopup] = useState(true); // Set to true by default
  const { setDealList } = useContext(StoreContext); // Assuming you're using this context for managing deals
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access the current location
  const message = location.state?.message || "Your action was successful."; // Get message from state

  // You can populate deal list if needed
  // setDealList([/* your deals */]);

  return (
    <div className="success-container">
      
      <ConfirmationAlert 
        showPopup={showPopup} 
        setShowPopup={setShowPopup} 
        alertType="login" 
      />
    </div>
  );
};

export default SuccessPage;
