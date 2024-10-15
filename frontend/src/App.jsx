import React, { useState } from 'react'
import NavbarComponent from './components/Navbar/Navbar'
import Topbar from './components/Topbar/Topbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import AddExtra from './pages/AddExtra/AddExtra'
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


const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Topbar />
      <NavbarComponent setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sucess' element={<Sucess/>}/>
        <Route path='/categories' element={<ProductCategories />}/>
        <Route path='/add-extra' element={<AddExtra />}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App