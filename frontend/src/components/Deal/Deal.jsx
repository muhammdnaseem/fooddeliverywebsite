import React, { useContext, useState, useEffect } from 'react';
import './Deal.css'; // Ensure you modify the CSS for new styles
import { StoreContext } from '../context/StoreContext';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Deal = () => {
  const { deal_list = [] } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  // Show the popup every time the page refreshes
  useEffect(() => {
    setShowPopup(true);
  }, []);

  // Handle closing the modal
  const handleClose = () => {
    setShowPopup(false);
  };

  if (deal_list.length === 0) {
    return null; // No need to render anything if there's no deal
  }

  const deal = deal_list[0]; // Assuming only one deal is available

  return (
    <>
      {/* The Modal (Popup) */}
      <Modal className=''  show={showPopup} onHide={handleClose} centered size="lg-md sm-sm">
        <div className='deal-popup-container'>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body className="deal-popup">
          <div className="popup-content">
          <Modal.Title>TODAY'S DEAL</Modal.Title>
            <h1 className="popup-deal-discount">{deal.offpercentage}% off</h1>
            <p className="popup-deal-text">ON ALL FOODS</p>
            <Button className="popup-deal-button" onClick={() => navigate('/today-deals')}>
              GET THE DEAL
            </Button>
          </div>
        </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default Deal;
