import React, { useState, useEffect } from 'react'; // Include useEffect
import './Header.css';
import { menu_list } from '../../assets/assets';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Header = () => {
  const [category, setCategory] = useState('');
  const [headerImage, setHeaderImage] = useState(menu_list[0]?.menu_image);
  const [menuName, setMenuName] = useState(menu_list[0]?.menu_name);
  const [menuDetails, setMenuDetails] = useState(menu_list[0]?.menu_details);
  const [imageAnimation, setImageAnimation] = useState(''); // New state for animation

  const handleMenuClick = (item) => {
    setImageAnimation('slide-out'); // Trigger the slide-out animation
    setTimeout(() => { // Wait for the animation to finish
      setCategory(prev => (prev === item.menu_name ? 'All' : item.menu_name));
      setHeaderImage(item.menu_image);
      setMenuName(item.menu_name);
      setMenuDetails(item.menu_details);
      setImageAnimation('slide-in'); // Trigger the slide-in animation
    }, 500); // Duration of the slide-out animation
  };

  return (
    <Container fluid>
      <Row className='header'>
        <Col xs={12} md={8} className='header-contents'>
        <div className='container header-content-container'>
          <h2>
            Delicious <br />
            <h3>Quench the hunger</h3>
          </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolorem, dicta itaque iure fugiat architecto.</p>
          <Button variant="warning" className='header-button'>Explore</Button>
          </div>
          <div className="header-menu-items">
            {menu_list.map((item, index) => (
              <div
                onClick={() => handleMenuClick(item)}
                key={index}
                className="header-menu-list-item"
              >
                <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt={item.menu_name} />
              </div>
            ))}
          </div>
        </Col>
        
        <Col xs={12} md={4} className="header-image-container text-align-right">
          <img src={headerImage} alt="Header" className={`header-image ${imageAnimation}`} />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
