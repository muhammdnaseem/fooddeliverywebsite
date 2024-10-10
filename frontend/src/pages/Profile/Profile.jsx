import React, { useState } from 'react'
import './Home.css'
import UserDetails from '../../components/UserDetails/UserDetails'

const Profile = () => {

  const [category, setCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('');

    console.log( category);
    // Define your categories here
    const categories = ['Food', 'Beverages', 'Snacks', 'Dairy', 'Fruits', 'Vegetables'];

    const handleSearch = (term, category) => {
        setSearchTerm(term);
        setCategory(category);
        // Optionally, trigger any other search-related logic here
    };
  return (
    <div>
     
    
     
      <UserDetails/>
      
    </div>
  )
}

export default Profile