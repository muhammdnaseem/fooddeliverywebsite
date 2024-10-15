import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Categories.css';
import { StoreContext } from '../context/StoreContext';
import FoodDisplay from '../FoodDisplay/FoodDisplay'; // Import FoodDisplay component

const Categories = () => {
    const { food_list = [], category_list = [] } = useContext(StoreContext);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
  const url = "http://localhost:4000";

 

  return (
    <Container className='categories-container mt-5'>

<FoodDisplay selectedCategory={selectedCategory} />
      {/* <h2 className='text-center'>Our Menu</h2>

      {/* Category Buttons */}
      {/* <div className="category-buttons d-flex justify-content-start flex-wrap mb-4"> */}
        {/* <button
          className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('All')}
        >
          All
        </button> */}
        {/* {category_list
                        .filter((category) => category.categoryname !== 'Extra') // Filter out "Extra"
                        .map((category) => (
                            <button 
                                className={selectedCategory === category._id ? 'active' : ''} 
                                key={category._id} 
                                onClick={() => handleCategoryChange(category._id)}
                            >
                                {category.categoryname}
                            </button>
                        ))} */}
      {/* </div> */}

      {/* Conditionally Render Category Cards or FoodDisplay */}
      {/* {selectedCategory === 'All' ? ( */}
        // Show Category Cards when "All" is selected
        {/* <Row className="gx-3 gy-4">
          {category_list.map((item, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card
                className="category-card"
                onClick={() => handleCategoryChange(item.categoryname)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Img
                  variant="top"
                  src={`${url}/categoryimages/${item.categoryimage}`}
                  className="img"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.categoryname}</Card.Title>
                </Card.Body>
              </Card> */}
            {/* </Col>
          ))}
        </Row>
      ) : ( */}
      
        {/* <FoodDisplay selectedCategory={selectedCategory} /> */}
      {/* )}  */}
      <FoodDisplay selectedCategory={selectedCategory} />
    </Container>
  );
};

export default Categories;
