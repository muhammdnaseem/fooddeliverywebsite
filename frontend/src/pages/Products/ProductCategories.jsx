import React, { useState } from 'react';
import './ProductCategories.css';
import Deals from '../../components/Deals/Deals';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Search from '../../components/Search/Search';
import Categories from '../../components/ExploreMenu/Categories';

const ProductCategories = () => {
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term); // Set the search term to filter food items
  };

  return (
    <div>
      
     
      <Search onSearch={handleSearch} />
      <FoodDisplay category={category} searchTerm={searchTerm} />
      {/* <Categories category={category} setCategory={setCategory}/> */}
    </div>
  );
};

export default ProductCategories;
