import React, { useContext } from 'react';
import './SeasonalFlavour.css';
import { StoreContext } from '../context/StoreContext';
import Countdown from '../CountDown/Countdown';
import { Container, Row, Col } from 'react-bootstrap';

const SeasonalFlavour = () => {
  const { deal_list = [] } = useContext(StoreContext);

  // Show a loading state if there are no deals
  if (deal_list.length === 0) {
    return <div>Loading...</div>; // or some placeholder
  }

  // Only show the first deal
  const firstDeal = deal_list[0];

  return (
    <Container className="flavour">
      <h2 className="flavour-title">Seasonal Flavour</h2>

      <Row className="mt-4">
        <Col key={firstDeal._id} className="mb-4 col-12">
          <div className="flavour-card d-flex">
            <div className="flavour-image-container">
              <img
                src={`http://localhost:4000/images/${firstDeal.dealproduct.image}`}
                alt={firstDeal.dealtitle}
                className="flavour-image"
              />
              <div className="big-discount-badge">SAVE {firstDeal.offpercentage}%</div>
            </div>

            <div className="flavour-info">
              <h3 className="flavour-title">{firstDeal.dealtitle}</h3>
              <p className="flavour-description">{firstDeal.dealdescription}</p>
              <h4 className="flavour-price">${firstDeal.dealprice}</h4>
              <p className="flavour-product">Starting at</p>
              {/* Uncomment the line below if you want to include the countdown timer */}
              {/* <Countdown dealTime={firstDeal.dealtime} createdTime={firstDeal.createdAt} /> */}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SeasonalFlavour;
