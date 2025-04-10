import React from 'react'
import Navbar from '../src/compoents/Navbar.jsx'
import Sidebar from './compoents/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import { ToastContainer } from 'react-toastify';

function App() {

  const url = "https://food-delivery-application-cqb4.onrender.com"

  return (
    <div className=''>
      <ToastContainer/>
      <Navbar/>
      <hr />

      <div className='flex'>

        <Sidebar/>

        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url} />}/>
          <Route path="/orders" element={<Orders url={url} />}/>
        </Routes>

      </div>
      
    </div>
  )
}

export default App