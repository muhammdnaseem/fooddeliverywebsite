// src/pages/Products.js

import React, { useState } from 'react';
import './Home.css';
import DealLine from '../../components/DealLine/DealLine';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import SearchBar from '../../components/SearchBar/SearchBar';

const Products = () => {
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    console.log(category);
    // Define your categories here
    const categories = ['Food', 'Beverages', 'Snacks', 'Dairy', 'Fruits', 'Vegetables'];

    const handleSearch = (term, category) => {
        setSearchTerm(term);
        setCategory(category);
        // Optionally, trigger any other search-related logic here
    };

    return (
        <div>
            <DealLine />
            <SearchBar onSearch={handleSearch} categories={categories} />
            <FoodDisplay category={category} searchTerm={searchTerm} />
            {/* <AppDownload/> */}
        </div>
    );
};

export default Products;
