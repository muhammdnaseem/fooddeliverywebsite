import React, { useContext } from 'react';
import './Deal.css';
import { StoreContext } from '../context/StoreContext';
import Countdown from '../CountDown/Countdown';
import { Container } from 'react-bootstrap';

const Deal = () => {
  const { deal_list = [] } = useContext(StoreContext);

  if (deal_list.length === 0) {
    return <div>Loading...</div>; // or some placeholder
  }

  // Formatting options for toLocaleString
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour clock
  };

  return (
    <Container>
    <div className="deal-container">
      <div className="deal-box">
        {deal_list.map((item) => (
          <div key={item._id} className="deal-item" style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Deal Title: {item.dealtitle}</h3>
            <p>Deal Description: {item.dealdescription}</p>
            <p style={{ fontWeight: 'bold' }}>Deal Discount: {item.offpercentage}% off</p>
            <p>Product: <strong>{item.dealproduct.name}</strong></p>
            <p>Created At: <strong>{new Date(item.createdAt).toLocaleString(undefined, options)}</strong></p> {/* Format Created At with AM/PM */}
            <p><Countdown dealTime={item.dealtime} createdTime={item.createdAt} /></p>
          </div>
        ))}
      </div>
    </div>
    </Container>
  );
};

export default Deal;
