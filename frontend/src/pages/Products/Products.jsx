// src/pages/Products.js

import React, { useState } from 'react';
import './ProductCategories.css';
import Deals from '../../components/Deals/Deals';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Search from '../../components/Search/Search';
import Categories from '../../components/ExploreMenu/Categories';

const Products = () => {
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        console.log('Searching for:', term);
        setSearchTerm(term);
      };

    return (
        <div>
             <Search onSearch={handleSearch} />
            <Deals limit={1} />
          
            {/* <FoodDisplay category={category} searchTerm={searchTerm} /> */}
            <Categories category={category} setCategory={setCategory}/>
            {/* <AppDownload/> */}
        </div>
    );
};

export default Products;
