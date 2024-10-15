import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './../context/StoreContext';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavbarComponent = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar bg-transparent">
  <Container>
    <Navbar.Brand as={Link} to="/">
      <img src={assets.logo} alt="Logo" className="logo" />
    </Navbar.Brand>

   

    {/* Icons Group for Mobile */}
    <div className="mobile-icons d-lg-none d-sm-flex">
          <img src={assets.search_icon} alt="Search" className="icon" />
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" className="icon" />
            <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
          </Link>
          {!token ? (
            <img src={assets.profile_icon1} alt="Profile" className="icon" onClick={() => setShowLogin(true)} />
          ) : (
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="icon profile-icon"
              onClick={() => navigate('/profile')}
            />
          )}
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='menu-button' />

    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto w-100 py-2 px-lg-5">
        <Nav.Link as={Link} to="/" className={`nav-link ${menu === 'home' ? 'active' : ''}`} onClick={() => setMenu('home')}>
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/categories" className={`nav-link ${menu === 'menu' ? 'active' : ''}`} onClick={() => setMenu('menu')}>
          Menu
        </Nav.Link>
        <NavDropdown title="Deals" id="deals-dropdown" className="menu-item">
          <NavDropdown.Item href="#deal-1">Deal 1</NavDropdown.Item>
          <NavDropdown.Item href="#deal-2">Deal 2</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#explore-menu" className="nav-link" onClick={() => setMenu('menu')}>About Us</Nav.Link>
        <Nav.Link href="#footer" className="nav-link" onClick={() => setMenu('contact-us')}>Contact Us</Nav.Link>
      </Nav>

      <Nav className="d-lg-flex desktop-icons d-sm-none align-items-center">
        <img src={assets.search_icon} alt="Search" className="icon" />
        <Link to="/add-extra">
          <img src={assets.basket_icon} alt="Cart" className="icon" />
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </Link>

        {!token ? (
          <img src={assets.profile_icon1} alt="Profile" className="icon" onClick={() => setShowLogin(true)} />
        ) : (
          <NavDropdown title={<img src={assets.profile_icon} alt="Profile" className="profile-icon" />} id="profile-dropdown">
            <NavDropdown.Item onClick={() => navigate('/profile')}>
              <img src={assets.bag_icon} alt="My Profile" /> My Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => logout()}>
              <img src={assets.logout_icon} alt="Logout" /> Logout
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


  );
};

export default NavbarComponent;
