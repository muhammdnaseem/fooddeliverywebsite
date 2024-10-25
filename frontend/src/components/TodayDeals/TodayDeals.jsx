import React, { useContext, useEffect, useState } from 'react';
import './TodayDeals.css';
import { StoreContext } from '../context/StoreContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNav from '../BreadcrumbNav/BreadcrumbNav';

const TodayDeals = ({ limit }) => {
  const navigate = useNavigate();
  const { deal_list = [], addToCart, updateBreadcrumbs } = useContext(StoreContext);

  // Hooks need to be called consistently.
  const [title, setTitle] = useState('');

  // Ensure the dealsToDisplay array is always valid
  const dealsToDisplay = deal_list.slice(0, limit);

  // Set the title when deals are available
  useEffect(() => {
    if (dealsToDisplay.length > 0) {
      setTitle(dealsToDisplay[0].dealtitle);
    }
  }, [dealsToDisplay]);

  // Update breadcrumbs when the title changes
  useEffect(() => {
    if (title) {
      const newBreadcrumb = { label: title, href: '/my-cart' };

      updateBreadcrumbs((prevBreadcrumbs) => [
        ...prevBreadcrumbs.filter((breadcrumb) => breadcrumb.label !== title),
        newBreadcrumb,
      ]);
    }
  }, [title, updateBreadcrumbs]);

  // Handle the Order Now button click
  const handleOrderNow = (item) => {
    addToCart(item.dealproduct._id);
    navigate('/add-extra', { state: { itemId: item.dealproduct._id } });
  };

  // Loading state if there are no deals
  if (deal_list.length === 0) {
    return <div>Loading...</div>;
  }


  return (
    <Container className="today-deals p-5">
     
      {/* Main Deal Section */}
     
      <Row>
        {dealsToDisplay.slice(0, 1).map((item) => (
          
          <Col key={item._id} className="mb-4 col-12 primary-deal">
            <Row>
              <Col lg={12} sm={12}>

              <BreadcrumbNav /> 
             
      </Col>
     
        </Row>
            <div className="today-deal-card today-big-deal">
              <div className="today-deal-image-container">
                <img
                  src={`http://localhost:4000/images/${item.dealproduct.image}`}
                  alt={item.dealtitle}
                  className="today-deal-image"
                />
               
              </div>
              <div className="today-discount-badge">50% OFF</div>
              <div className="today-deal-info">
                
                <p className="deal-description">{item.dealdescription}</p>
                <p className='note'>Note</p>
                <p>{item.dealdescription}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Specials Deals Section */}
      <Row className="secondary-deals mt-4">
     
        <div className='d-flex align-items-center justify-content-between mb-3'>
        <h3>Specail Deals</h3>
        <Button 
        variant="warning"
        className='header-button'
        onClick={() => navigate('/special-deals')}
        >View All</Button>
        </div>
        
        {dealsToDisplay.slice(1, 3).map((item) => (
         
          <Col lg={6} sm={12}  key={item._id} className='mb-sm-3'>
            <div
              className="today-deal-card small-deal"
              style={{
                backgroundImage: `url(http://localhost:4000/images/${item.dealproduct.image})`,
              }}
            >
              <div className="today-deal-info">
                <div className='d-flex align-items-center justify-content-between '>
                <h5 className="today-deal-title">{item.dealtitle}</h5>
                <h5 className="today-deal-price">${item.productPrice}</h5>
                </div>
                <p className="deal-description text-start">{item.dealdescription}</p>
                <Button 
        variant="warning"
        className='header-button'
        onClick={() => handleOrderNow(item)}
        >Order Now</Button>
       
              </div>

              
              <div className="small-today-discount-badge">
  {item.offpercentage}%<br />OFF
</div>

            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TodayDeals;
