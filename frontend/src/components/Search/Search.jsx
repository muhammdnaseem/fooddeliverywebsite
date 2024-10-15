import React, { useState } from 'react';
import './Search.css'; // Custom styles
import { FaSearch } from 'react-icons/fa';

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    const term = e.target.value;
    setInput(term); // Keep track of the input
    onSearch && onSearch(term); // Call the parent function to filter results
  };

  return (
    <div className="custom-search-container">
      <div className="custom-search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          id="search-input"
          placeholder="Search for the desired food items"
          value={input}
          onChange={handleChange} // Filter on every change
        />
      </div>
    </div>
  );
};

export default Search;
