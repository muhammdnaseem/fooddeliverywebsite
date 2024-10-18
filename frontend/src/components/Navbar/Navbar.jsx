import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './../context/StoreContext';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSearch, FaUserLock, FaShoppingCart, FaUserCheck } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";



const NavbarComponent = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  // Handle adding to cart and redirecting to AddExtra with itemId as state
  const handleAddToCartAndRedirect = (itemId) => {
    addToCart(itemId); // Add item to cart
    navigate('/add-extra', { state: { itemId } }); // Redirect and pass itemId as state
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar bg-transparent">
  <Container>
    <Navbar.Brand as={Link} to="/">
      <img src={assets.logo} alt="Logo" className="logo" />
    </Navbar.Brand>

   

    {/* Icons Group for Mobile */}
    <div className="mobile-icons d-lg-none d-sm-flex">
          {/* <img src={assets.search_icon} alt="Search" className="icon mx-2" /> */}
          <FaSearch alt="Search" className="icon mx-2" />
          <Link onClick={() => handleAddToCartAndRedirect(id)}>
            {/* <img src={assets.basket_icon} alt="Cart" className="icon mx-2" /> */}
            <FaShoppingCart alt="Cart" className="icon mx-2"/>
            <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
          </Link>
          {!token ? (
            // <img src={assets.profile_icon1} alt="Profile" className="icon mx-2" onClick={() => setShowLogin(true)} />
            <FaUserLock alt="Profile" className="icon mx-2" onClick={() => setShowLogin(true)} />
          ) : (
            // <img
            //   src={assets.profile_icon}
            //   alt="Profile"
            //   className="icon profile-icon"
            //   onClick={() => navigate('/profile')}
            // />
            <NavDropdown className='profile-dropdown' title={
              // <img src={assets.profile_icon} alt="Profile" className="profile-icon" />
              <FaUserCheck alt="Profile" className="icon mx-2" /> 
              } id="profile-dropdown">
                <NavDropdown.Item onClick={() => navigate('/profile')}>
                  {/* <img src={assets.bag_icon} alt="My Profile" /> */}
                  <FaUserCheck alt="My Profile"   />  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => logout()}>
                  {/* <img src={assets.logout_icon} alt="Logout" /> */}
                  <IoMdLogOut alt="Logout"/>
                   Logout
                </NavDropdown.Item>
              </NavDropdown>
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
        <Nav.Link as={Link} to="/myorders" className={`nav-link ${menu === 'orders' ? 'active' : ''}`} onClick={() => setMenu('orders')}>Order History</Nav.Link>
        <Nav.Link as={Link} to="/aboutus" className={`nav-link ${menu === 'aboutus' ? 'active' : ''}`} onClick={() => setMenu('aboutus')}>About Us</Nav.Link>
        
      </Nav>

      <Nav className="d-lg-flex desktop-icons d-sm-none align-items-center">
        {/* <img src={assets.search_icon} alt="Search" className="icon mx-2" /> */}
        <FaSearch alt="Cart" className="icon mx-2"/>
        
        <Link 
        onClick={() => handleAddToCartAndRedirect(id)}
        >
          {/* <img src={assets.basket_icon} alt="Cart" className="icon mx-2" /> */}
          <FaShoppingCart alt="Cart" className="icon mx-2"/>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </Link>

        {!token ? (
          // <img src={assets.profile_icon1} alt="Profile" className="icon mx-2" onClick={() => setShowLogin(true)} />
          <FaUserLock alt="Profile" className="icon mx-2" onClick={() => setShowLogin(true)} />
        ) : (
          <NavDropdown className='profile-dropdown' title={
          // <img src={assets.profile_icon} alt="Profile" className="profile-icon" />
          <FaUserCheck alt="Profile" className="icon mx-2" /> 
          } id="profile-dropdown">
            <NavDropdown.Item onClick={() => navigate('/profile')}>
              {/* <img src={assets.bag_icon} alt="My Profile" /> */}
              <FaUserCheck alt="My Profile"   />  My Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => logout()}>
              {/* <img src={assets.logout_icon} alt="Logout" /> */}
              <IoMdLogOut alt="Logout"/>
               Logout
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
