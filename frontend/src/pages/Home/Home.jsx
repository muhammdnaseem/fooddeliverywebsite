import React, { useState } from 'react'
import './Home.css'
import DealLine from '../../components/DealLine/DealLine'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'

import Deal from '../../components/Deal/Deal'

import Deals from '../../components/Deals/Deals'
import Testimonials from '../../components/Testimonials/Testimonials'


const Home = () => {

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
   
      <DealLine/>
      <Header/>
      <Deal/>
      
      <ExploreMenu category={category} setCategory={setCategory}/>

      <Deals />

      <Testimonials/>
      {/* <SeasonalFlavour /> */}
      {/* <FoodDisplay category={category}/> */}
      {/* <AppDownload/> */}
    </div>
  )
}

export default Home