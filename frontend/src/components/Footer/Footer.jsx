import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { menu_list } from '../../assets/assets';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row>
      <Col md={5} className='d-lg-flex align-items-center ms-lg-5 mt-0'>
      
      <div className="logo-container bg-white d-flex justify-content-center align-items-center"
      style={{
        maxWidth: '90px',
        minWidth: '90px'
      }}>
  <Image src={assets.logo} className="footer-logo" alt="Logo" />
</div>

         
          <div className='d-flex flex-column ms-2' > {/* Added ms-2 for margin start */}
            <h3>FOOD HUB</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus alias maiores corporis aperiam ea maxime. Odio sequi necessitatibus molestias id, itaque eos non quis minima eaque officia obcaecati vel voluptatibus?
            </p>
          </div>
        </Col>

        <Col md={2}>
          <div className="footer-content">
            <h5>COMPANY</h5>
            <ListGroup>
              <ListGroup.Item className="border-0 p-0 bg-transparent text-white">Menu</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 bg-transparent text-white">About Us</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 bg-transparent text-white">Contact Us</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 bg-transparent text-white">Main dishes
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

        <Col md={2}>
          <div className="footer-content">
            <h5>CATEGORIES</h5>
            <ListGroup>
              {menu_list.map((item, index) => (
                <ListGroup.Item className="border-0 p-0 bg-transparent text-white" key={index}>{item.menu_name}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>

        <Col md={2}>
          <div className="footer-content footer-social-icons">
            <h5>FOLLOW US</h5>
            <div className="social-icons">
            <img src={assets.facebook_icon} alt="Facebook" className="me-2" />
            <img src={assets.twitter_icon} alt="Twitter" className="me-2" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="me-2" />
            </div>
          </div>
        </Col>
      </Row>

      <br></br>
      <br></br>

    
      
      

      <hr className="my-3 mx-auto" />

      {/* Centered copyright text */}
      <p className="footer-copyright text-center">
      <span style={{fontSize: '18px'}}>&copy;</span>  2022 Restaurants. All Right Reserved. Designed by <b>Hifah Technologies.</b>
      </p>
    </Container>
  );
};

export default Footer;
