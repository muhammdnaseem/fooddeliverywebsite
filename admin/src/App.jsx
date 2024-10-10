import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Login from './components/Login/Login'
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import AddDeal from './pages/AddDeal/AddDeal';
import DealList from './pages/DealList/DealList';
import AddCategory from './pages/AddCategory/AddCategory';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/add-deal' element={<AddDeal url={url} />} />
          <Route path='/deal-list' element={<DealList url={url}/>} />
          <Route path='/add-category' element={<AddCategory url={url} />} />
          <Route path='/list' element={<List url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App