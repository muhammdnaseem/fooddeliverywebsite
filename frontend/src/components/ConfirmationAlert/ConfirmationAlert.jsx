import React, { useContext } from 'react';
import './ConfirmationAlert.css'; // Ensure CSS reflects the updated styles
import { StoreContext } from '../context/StoreContext';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { BsCheckCircle } from 'react-icons/bs'; // Importing the checkmark icon

const ConfirmationAlert = ({ showPopup, setShowPopup, alertType }) => {
  const { deal_list = [] } = useContext(StoreContext);
  const navigate = useNavigate(); 

  // Close the modal handler
  const handleClose = () => setShowPopup(false);

  if (deal_list.length === 0) {
    return null; // Don't render if there's no deal
  }

  const deal = deal_list[0]; 

  let popupMessage = "";
  let popupSubtext = "";

  switch (alertType) {
    case "registration":
      popupMessage = "Registration Successful!";
      popupSubtext = "You can now log in.";
      break;
    case "login":
      popupMessage = "Login Successful!";
      popupSubtext = "Welcome back!";
      break;
    case "update":
      popupMessage = "Update Successful!";
      popupSubtext = "Your information has been updated.";
      break;
    default:
      return null; // Handle unexpected alert type
  }

  return (
    <>
      <Modal show={showPopup} onHide={handleClose} centered size="sm">
        <div className="order-confirm-popup-container">
          <Modal.Body className="deal-popup">
            {/* Icon Circle */}
            <p className="popup-text">{popupMessage}</p>
            <div className="popup-check-icon">
              <BsCheckCircle />
            </div>
            <p className="popup-subtext">{popupSubtext}</p>
            <Button
              variant="warning"
              className="header-button confirm-order"
              onClick={() => navigate('/myorders')}
            >
              Order History
            </Button>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationAlert;
