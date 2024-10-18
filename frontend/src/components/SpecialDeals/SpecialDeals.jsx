import React, { useContext } from 'react';
import './SpecialDeals.css';
import { StoreContext } from '../context/StoreContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SpecialDeals = ({ limit }) => {
  const { deal_list = [], addToCart } = useContext(StoreContext);

  const navigate = useNavigate(); // Initialize navigate

  if (deal_list.length === 0) {
    return <div>Loading...</div>;
  }

  const dealsToDisplay = deal_list.slice(0, limit);

  // Handle Order Now button click: Add item to cart and navigate to /add-extra
const handleOrderNow = (item) => {
  addToCart(item.dealproduct._id); // Add product to cart using its ID
  navigate('/add-extra', { state: { itemId: item.dealproduct._id } }); // Redirect to AddExtra page
};

  return (
    <Container className="deals-showcase p-5">
      <h2>Special Deals</h2>
      <Row className="justify-content-center">
        {dealsToDisplay.map((item, index) => (
          <Col
            key={item._id}
            className={`special-deal-card ${
              index === 1 ? 'center-deal' : 'side-deal'
            } mb-4`}
          >
            <div className="deal-card-content">
              <div
                className="deal-image"
                style={{
                  backgroundImage: `url(http://localhost:4000/images/${item.dealproduct.image})`,
                }}
              />
              
              <div className="deal-info">
              <div className='d-flex align-items-center justify-content-between '>
                <h5 className="today-deal-title">{item.dealtitle}</h5>
                {index === 1 && (
                  <h5 className="today-deal-price">${item.dealprice}</h5>
                )}
                </div>
                <p className="deal-description text-start">{item.dealdescription}</p>
                <Button variant="warning" className="header-button"
                onClick={() => handleOrderNow(item)}
                >
                  Order Now
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SpecialDeals;
