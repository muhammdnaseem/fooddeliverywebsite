// src/components/SearchBar/SearchBar.js

import React, { useState } from 'react';
import './SearchBar.css'; // Create this CSS file for styling

const SearchBar = ({ onSearch, categories }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    const handleSearch = () => {
        onSearch(searchTerm, category);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="search-input"
            />
            {/* <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
            >
                <option value="All">All</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                ))}
            </select> */}
            <button onClick={handleSearch} className="search-button">Search</button>
        </div>
    );
};

export default SearchBar;
