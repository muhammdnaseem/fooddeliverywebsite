import React, { useState } from 'react'
import NavbarComponent from './components/Navbar/Navbar'
import GoogleAuthHandler from './components/GoogleAuthHandler';
import Topbar from './components/Topbar/Topbar'
import TodayDeals from './components/TodayDeals/TodayDeals'
import SpecialDeals from './components/SpecialDeals/SpecialDeals'
import Franchise from './components/Franchise/Franchise'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import AddExtra from './pages/AddExtra/AddExtra'
import MyCart from './pages/MyCart/MyCart'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Products from './pages/Products/ProductCategories'
import ProductCategories from './pages/Products/ProductCategories'
import Sucess from './pages/Home/Sucess'
import Profile from './pages/Profile/Profile'
import AboutUs from './components/AboutUs/AboutUs'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const App = () => {
  const stripePromise = loadStripe('pk_test_51PE9CHP3pfdxJbgF5ker5xndIu2jPWDuoyamZlx6aKf1eRX1oIixcaFm5HmAPEB4pymxSkazLWqZFT92BiO5Zjd900J1kMH5KL');


  const [showLogin, setShowLogin] = useState(false);
  return (
    <Elements stripe={stripePromise}>
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Topbar />
      <NavbarComponent setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/success' element={<Sucess />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path="/auth/google/callback" element={<GoogleAuthHandler />} />
        <Route path='/categories' element={<ProductCategories />}/>
        <Route path='/add-extra' element={<AddExtra />}/>
        <Route path='/my-cart' element={<MyCart/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/today-deals' element={<TodayDeals/>}/>
        <Route path='/special-deals' element={<SpecialDeals/>}/>
        <Route path='/franchise' element={<Franchise/>}/>
        
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
    </Elements>
  )
}

export default App