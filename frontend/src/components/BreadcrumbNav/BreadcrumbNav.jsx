import React, {useContext} from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import { StoreContext } from '../context/StoreContext';// Import useStore from your context
import './BreadcrumbNav.css';

// Breadcrumb Component
const BreadcrumbNav = () => {
  const { breadcrumbItems} = useContext(StoreContext);


  return (
    <Breadcrumb className="breadcrumb-container">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <Breadcrumb.Item
            href={item.href}
            active={item.active || false}
            className="breadcrumb-link"
          >
            {item.label}
          </Breadcrumb.Item>
          {index < breadcrumbItems.length - 1 && (
            <span style={{ margin: '0 8px' }}>
              <IoIosArrowForward />
            </span>
          )}
        </React.Fragment>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
