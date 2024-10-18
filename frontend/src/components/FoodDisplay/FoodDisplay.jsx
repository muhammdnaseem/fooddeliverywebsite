import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FoodDisplay = ({ searchTerm = '' }) => {
  const { food_list = [], category_list = [] } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const url = "http://localhost:4000"; // Base URL for images

  const handleCategoryChange = (category) => setSelectedCategory(category);

  // Filter food items based on selected category and search term
  const filteredFoodItems = food_list.filter((item) => {
    const matchesCategory = 
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const excludedCategories = 
      ['6700f136ded0621ea8687d74', '6700f0eaded0621ea8687d72']; // Extra, Drinks

    return matchesCategory && matchesSearch && !excludedCategories.includes(item.category);
  });

  return (
    <Container className='my-3'>
      <div className="food-display" id="food-display">
        <h2 className="text-center">Our Menu</h2>

        {/* Category Buttons */}
        <div className="category-buttons d-flex justify-content-start flex-wrap mb-4">
          <button
            className={selectedCategory === 'All' ? 'active' : ''}
            onClick={() => handleCategoryChange('All')}
          >
            All
          </button>
          {category_list
            .filter((category) => category.categoryname !== 'Extra') // Exclude "Extra"
            .map((category) => (
              <button
                key={category._id}
                className={selectedCategory === category._id ? 'active' : ''}
                onClick={() => handleCategoryChange(category._id)}
              >
                {category.categoryname}
              </button>
            ))}
        </div>

        {/* Render Category Cards or Food Items */}
        {selectedCategory === 'All' && searchTerm === '' ? (
          <Row className="gx-3 gy-4">
            {/* Render Category Cards */}
            {category_list.map((category) => (
              <Col key={category._id} xs={12} md={6} lg={4} >
                <Card
                  className="category-card mx-auto"
                  onClick={() => handleCategoryChange(category._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Img
                    variant="top"
                    src={`${url}/categoryimages/${category.categoryimage}`}
                    className="img"
                    style={{ height: '200px', objectFit: 'cover', border: 0, }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{category.categoryname}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="food-display-list">
            {/* Render Filtered Food Items */}
            {filteredFoodItems.length > 0 ? (
              filteredFoodItems.map((item) => (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  category={item.category}
                  description={item.description}
                  sizes={item.sizes}
                  image={item.image}
                  reviews={item.reviews}
                />
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default FoodDisplay;
