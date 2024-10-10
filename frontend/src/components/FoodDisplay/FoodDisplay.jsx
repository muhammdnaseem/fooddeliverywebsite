import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
    const { food_list = [], category_list = [] } = useContext(StoreContext);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className='food-display' id='food-display'>
            <h2>Menu</h2>
            <div className="category-selector">
                <div className="category-buttons">
                    <button 
                        className={selectedCategory === 'All' ? 'active' : ''} 
                        onClick={() => handleCategoryChange('All')}
                    >
                        All
                    </button>
                    {category_list
                        .filter((category) => category.categoryname !== 'Extra') // Filter out "Extra"
                        .map((category) => (
                            <button 
                                className={selectedCategory === category._id ? 'active' : ''} 
                                key={category._id} 
                                onClick={() => handleCategoryChange(category._id)}
                            >
                                {category.categoryname}
                            </button>
                        ))}
                </div>
            </div>
            <div className="food-display-list">
                {food_list
                    .filter(item => item.category !== '6700f136ded0621ea8687d74' && item.category !== '6700f0eaded0621ea8687d72') // Exclude both "Extra" and "Drinks" categories
                    .map((item, index) => {
                        if (selectedCategory === 'All' || selectedCategory === item.category) {
                            return (
                                
                                <FoodItem 
                                    key={index} 
                                    id={item._id} 
                                    name={item.name}
                                    category={item.category} 
                                    description={item.description} 
                                    sizes={item.sizes} 
                                    image={item.image} 
                                    reviews={item.reviews} // Pass the reviews here
                                />
                            );
                        }
                        return null;
                    })}
            </div>
        </div>
    );
};

export default FoodDisplay;
