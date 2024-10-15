import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { menu_list } from '../../assets/assets';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row>
      <Col md={5} className='d-lg-flex align-items-center ms-lg-5'>
      
      <div className="logo-container bg-white d-flex justify-content-center align-items-center">
  <Image src={assets.logo} className="footer-logo" alt="Logo" />
</div>

         
          <div className='d-flex flex-column ms-2' > {/* Added ms-2 for margin start */}
            <h3>FOOD HUB</h3>
            <p>
              fjkkjfskdfksfjkhasdjkhfjksdhfjkasdfjk
              asdjkfjklasdjlsdhasdjkhfsjkldhfjkldjklf
              lsdkhfldk hfjksdhfjkahfdjkdjk
            </p>
          </div>
        </Col>

        <Col md={2}>
          <div className="footer-content">
            <h5>COMPANY</h5>
            <ListGroup>
              <ListGroup.Item className="border-0 p-0 bg-transparent">Home</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 bg-transparent">About Us</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 bg-transparent">Delivery</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 bg-transparent">Privacy Policy</ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

        <Col md={2}>
          <div className="footer-content">
            <h5>CATEGORIES</h5>
            <ListGroup>
              {menu_list.map((item, index) => (
                <ListGroup.Item className="border-0 p-0 bg-transparent" key={index}>{item.menu_name}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>

        <Col md={2}>
          <div className="footer-content footer-social-icons">
            <h5>FOLLOW US</h5>
            <div className="social-icons">
              <Image src={assets.facebook_icon} alt="Facebook" />
              <Image src={assets.twitter_icon} alt="Twitter" />
              <Image src={assets.linkedin_icon} alt="LinkedIn" />
            </div>
          </div>
        </Col>
      </Row>

      <br></br>
      <br></br>

    
      
      {/* ListGroup in one line */}
      <ListGroup className="d-flex justify-content-center align-items-center flex-row my-3">
        <ListGroup.Item className="border-0 p-0 mx-3 bg-transparent">Terms Of Service</ListGroup.Item>
        <ListGroup.Item className="border-0 p-0 mx-3 bg-transparent">Privacy Policy</ListGroup.Item>
      </ListGroup>

      <hr className="my-3" />

      {/* Centered copyright text */}
      <p className="footer-copyright text-center">
        Copyright 2024 &copy; HEN n Bun - All Rights Reserved.
      </p>
    </Container>
  );
};

export default Footer;
