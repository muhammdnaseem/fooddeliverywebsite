import React, { useContext } from 'react';
import './OrderConfirm.css'; // Ensure CSS reflects the updated styles
import { StoreContext } from '../context/StoreContext';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { BsCheckCircle } from 'react-icons/bs'; // Importing the checkmark icon

const OrderConfirm = ({ showPopup, setShowPopup, popupMessage }) => {
  const { deal_list = [] } = useContext(StoreContext);
  const navigate = useNavigate(); 

  // Close the modal handler
  const handleClose = () => setShowPopup(false);

  if (deal_list.length === 0) {
    return null; // Don't render if there's no deal
  }

  const deal = deal_list[0]; 

  return (
    <>
      <Modal show={showPopup} onHide={handleClose} centered size="sm">
        <div className="order-confirm-popup-container">
          <Modal.Body className="deal-popup">
            {/* Icon Circle */}
            <p className="popup-text">{popupMessage}</p> {/* Display the message passed as prop */}

            <div className="popup-check-icon">
              <BsCheckCircle />
            </div>
            <p className="popup-subtext">{popupMessage === 'Payment Done!' ? 'Order Confirmed!' : 'Order Added. Please add payment on Orders.'}</p>
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

export default OrderConfirm;
