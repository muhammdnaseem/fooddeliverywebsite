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
    const { deal_list = [], cartItems } = useContext(StoreContext);
console.log(cartItems);
    // Updated totalItems calculation
    const totalItems = (cartItems.items && typeof cartItems.items === 'object') ? 
        Object.values(cartItems.items).reduce((total, count) => total + count, 0) : 0;

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    };

    const handleAddToCartAndRedirect = () => {
        navigate('/my-cart'); // Change this to your cart route
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="navbar bg-transparent">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={assets.logo} alt="Logo" className="logo" />
                </Navbar.Brand>

                {/* Icons Group for Mobile */}
                <div className="mobile-icons d-lg-none d-sm-flex">
                    <FaSearch alt="Search" className="icon mx-2" />
                    <Link as={Link} to={"/my-cart"}>
                        <FaShoppingCart alt="Cart" className="icon mx-2" />
                        <div className={getTotalCartAmount() === 0 ? '' : 'dot'}>
                            <div className="dot">{totalItems}</div>
                        </div>
                    </Link>
                    {!token ? (
                        <FaUserLock alt="Profile" className="icon mx-2" onClick={() => setShowLogin(true)} />
                    ) : (
                        <NavDropdown className='profile-dropdown' title={<FaUserCheck alt="Profile" className="icon mx-2" />} id="profile-dropdown">
                            <NavDropdown.Item onClick={() => navigate('/profile')}>
                                <FaUserCheck alt="My Profile" /> My Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>
                                <IoMdLogOut alt="Logout" /> Logout
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
                            {deal_list.length > 0 ? (
                                deal_list.map((deal) => (
                                    <NavDropdown.Item key={deal._id} onClick={() => navigate(`/today-deals/`)}>
                                        {deal.dealtitle}
                                    </NavDropdown.Item>
                                ))
                            ) : (
                                <NavDropdown.Item disabled>No Deals Available</NavDropdown.Item>
                            )}
                        </NavDropdown>
                        <Nav.Link as={Link} to="/myorders" className={`nav-link ${menu === 'orders' ? 'active' : ''}`} onClick={() => setMenu('orders')}>Order History</Nav.Link>
                        <Nav.Link as={Link} to="/aboutus" className={`nav-link ${menu === 'aboutus' ? 'active' : ''}`} onClick={() => setMenu('aboutus')}>About Us</Nav.Link>
                    </Nav>

                    <Nav className="d-lg-flex desktop-icons d-sm-none align-items-center">
                        <FaSearch alt="Cart" className="icon mx-2" />
                        <Link as={Link} to={"/my-cart"}>
                            <div className="dot">{totalItems}</div>
                            <FaShoppingCart alt="Cart" className="icon mx-2" />
                        </Link>
                        {!token ? (
                            <FaUserLock alt="Profile" className="icon mx-2" onClick={() => setShowLogin(true)} />
                        ) : (
                            <NavDropdown className='profile-dropdown' title={<FaUserCheck alt="Profile" className="icon mx-2" />} id="profile-dropdown">
                                <NavDropdown.Item onClick={() => navigate('/profile')}>
                                    <FaUserCheck alt="My Profile" /> My Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>
                                    <IoMdLogOut alt="Logout" /> Logout
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
