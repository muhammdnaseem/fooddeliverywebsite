import React, { useState } from 'react';
import './Header.css';
import default_header_img from '../../assets/menu_6.png'; // Default header image
import { menu_list } from '../../assets/assets';

const Header = () => {
  
  const [category, setCategory] = useState('');
  const [headerImage, setHeaderImage] = useState(menu_list[0]?.menu_image); // State for the header image
  const [menuName, setMenuName] = useState(menu_list[0]?.menu_image); // State for the header image
  const [menuDetails, setMenuDetails] = useState(menu_list[0]?.menu_image); // State for the header image
  

  const handleMenuClick = (item) => {
    setCategory(prev => (prev === item.menu_name ? 'All' : item.menu_name));
    setHeaderImage(item.menu_image); // Update the header image with the clicked item's image
    setMenuName(item.menu_name);
    setMenuDetails(item.menu_details);
  };



  return (
    <div className='header'>
      <div className="header-contents">
        <h2>
          <span style={{ color: 'yellow' }}>Delicious</span> <br />
          Quench the hunger
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolorem, dicta itaque iure fugiat architecto.</p>
        <button>View Menu</button>
      </div>
      <div className="header-image">
        <img src={headerImage} alt="Header" className='header-image' />
        {/* <p>{menuName}</p>
            <h6>{menuDetails}</h6> */}
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
    </div>
  );
}

export default Header;
