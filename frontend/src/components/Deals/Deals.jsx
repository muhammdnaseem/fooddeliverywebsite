import React, { useContext } from 'react';
import './Deals.css';
import { StoreContext } from '../context/StoreContext';
import { Container, Row, Col } from 'react-bootstrap';

const Deals = ({ limit }) => {
  const { deal_list = [] } = useContext(StoreContext);

  if (deal_list.length === 0) {
    return <div>Loading...</div>; // or some placeholder
  }

  // Use the limit prop to slice the deal_list
  const dealsToDisplay = deal_list.slice(0, limit);

  return (
    <Container className="best-deals">
      <h2 className={`deals-title ${limit === 1 && 'd-none'}`}>Best Deals</h2>

      <Row className="mt-4">
        {dealsToDisplay.map((item, index) => (
          <Col
            key={item._id}
            className={`mb-4 ${index === 0 ? 'col-12 first-deal' : 'col-lg-6'}`}
          >
            <div
              className={`deal-card ${index === 0 ? 'big-deal' : 'small-deal'}`}
              style={
                index > 0
                  ? {
                      backgroundImage: `url(http://localhost:4000/images/${item.dealproduct.image})`,
                    }
                  : {}
              }
            >
              {index === 0 ? (
                // Big Deal Structure
                <>
                  <div className="deal-image-container">
                    <img
                      src={`http://localhost:4000/images/${item.dealproduct.image}`}
                      alt={item.dealtitle}
                      className="deal-image"
                    />
                    <div className="big-discount-badge">SAVE {item.offpercentage}%</div>
                  </div>

                  <div className="deal-info big-deal-info">
                    <h3 className="deal-title">{item.dealtitle}</h3>
                    <p className="deal-description">{item.dealdescription}</p>
                    <h4 className="deal-price">${item.dealprice}</h4>
                    <p className="deal-product">Starting at</p>
                  </div>
                </>
              ) : (
                // Small Deal Structure
                <>
                  <div className="deal-left-side"></div>
                  <div className="small-discount-badge">SAVE {item.offpercentage}%</div>
                  <div
                    className={`deal-info small-deal-info ${index === 1 ? 'first-small-deal' : ''}`}
                    style={index === 1 ? { borderRadius: '10% 0 0 10%' } : {}}
                  >
                    <h3 className="deal-title">{item.dealtitle}</h3>
                    <h4 className="deal-price">${item.dealprice}</h4>
                    <p className="deal-product">Starting at</p>
                  </div>
                </>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Deals;
