import React from 'react';
import './Topbar.css';
import { assets } from '../../assets/assets';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Topbar = () => {
  const navigate = useNavigate(); // Initialize navigate
  return (
    <Navbar expand="lg" className="custom-navbar-bg">
      <Container>
        <div className="d-flex w-100 justify-content-between align-items-center text-white flex-column flex-lg-row">
          
          {/* Left Section - FOLLOW US and Social Media Icons */}
          <div className="topbar-left d-flex align-items-center">
            <p className="me-2 text-white">FOLLOW US</p>
            <img src={assets.facebook_icon} alt="Facebook" className="me-2" />
            <img src={assets.twitter_icon} alt="Twitter" className="me-2" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="me-2" />
          </div>

          {/* Center Section - Contact Info */}
          <div className="navbar-contact text-center my-2 my-lg-0">
            <p>CONTACT US: <span className='text-white'>0992123456789</span></p>
          </div>

          {/* Right Section - Location Info with Icon */}
          <div className="navbar-location d-flex align-items-center">
            <img src={assets.location_icon} alt="Location" className="location-icon me-2" />
            <p className="mb-0">NAWASHER, ABBOTABAD</p>
          </div>

          {/* Right Section - Location Info with Icon */}
          <div className="navbar-location d-flex align-items-center">
            <Button
            variant="danger"
            onClick={() => navigate('/franchise')}
            >
              FRANCHISE
            </Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Topbar;
