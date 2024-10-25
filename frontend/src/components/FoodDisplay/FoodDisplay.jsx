import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { Container, Row, Col, Card, Breadcrumb } from 'react-bootstrap';
import { IoIosArrowForward } from "react-icons/io";
import BreadcrumbNav from '../BreadcrumbNav/BreadcrumbNav';

const FoodDisplay = ({ searchTerm = '' }) => {
  const { food_list = [], category_list = [], getTotalCartAmount, cartItems, updateBreadcrumbs, breadcrumbItems } = useContext(StoreContext);

  const [categoryName, setCategoryName] = useState('All Items');
 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const url = "http://localhost:4000"; // Base URL for images

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const name =
      category === 'All'
        ? 'All Items'
        : category_list.find((cat) => cat._id === category)?.categoryname || 'Category';
    setCategoryName(name);


    // Create a new breadcrumb item for the selected category
    const newBreadcrumb = { label: name, href: '/categories' };

    // Update the breadcrumbs in context
    updateBreadcrumbs((prevBreadcrumbs) => [
      ...prevBreadcrumbs.filter(item => item.label !== name), // Remove any existing category breadcrumb
      newBreadcrumb, // Add the new active category
    ]);

    
  };







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
       <BreadcrumbNav /> 
      <div className="food-display" id="food-display">
     



        {/* Category Buttons */}
        <div className="category-buttons d-flex justify-content-start flex-wrap mb-4">

          <button
            className={selectedCategory === 'All' ? 'active' : ''}
            onClick={() => handleCategoryChange('All')}
          >
            All
          </button>
          {category_list
            .filter((category) => category.categoryname !== 'Extra') 
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
