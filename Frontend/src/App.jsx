import React, { useContext, useState } from 'react'
import { Route, Routes ,Link, useNavigate } from 'react-router-dom'
import Navbar from './compoents/Navbar'
import Footer from './compoents/Footer'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
import LoginPopup from './compoents/LoginPopup'
import SplitBill from './Pages/SplitBill'
import { assets } from './assets/assets2'
import { Context } from './context/Context'
import { MdOutlineCancel } from "react-icons/md";
import Verify from './Pages/Verify'
import MyOrders from './Pages/MyOrders'

function App() {

  const [showLogin,setShowLogin] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const navigate = useNavigate()


  const handleMenuBtn = () => {

    navigate('/')

    setTimeout(() => {
      const targetElement = document.getElementById('explore-menu')

      if (targetElement) {
        targetElement.scrollIntoView()
      }

    }, 200)

  }

  const handleMobileViewBtn = () => {

    navigate('/')

    setTimeout(() => {
      const targetElement = document.getElementById('app-download')

      if (targetElement) {
        targetElement.scrollIntoView()
      }

    }, 200)

  }

  const handleContactBtn = () => {

    navigate('/')

    setTimeout(() => {
      const targetElement = document.getElementById('footer')

      if (targetElement) {
        targetElement.scrollIntoView()
      }

    }, 200)

  }

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}

      <div className={`${mobileView === true ? "hidden" : "block"} md:block m-0 p-0 box-border min-h-[100vh] outfit`}>

        <Navbar setShowLogin={setShowLogin} mobileView={mobileView} setMobileView={setMobileView}/>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/splitbill' element={<SplitBill/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>

        <Footer />

      </div>

      <div onClick={() => setMobileView(false)} className={`md:hidden w-full h-screen pt-16 px-4 bg-orange-500 fixed top-0 right-0 transition-transform duration-300 ease-in-out ${mobileView ? "translate-x-0" : "translate-x-full"}`}>

        <div className='text-3xl relative'>
          <MdOutlineCancel onClick={() => setMobileView(false)} className='absolute right-[-10px] sm:right-16 top-[-30px] cursor-pointer hover:scale-105 duration-500 hover:text-orange-500'/>
        </div>

        <div className=''>

          <div className='flex justify-center text-3xl text-white font-semibold'>
            <h1>Food Delivery System</h1>
          </div>

          <ul className='flex flex-col items-center mt-8 text-xl gap-4 cursor-pointer text-white'>

            <Link to='/' className='hover:text-black hover:scale-105 duration-500'>
              Home
              <hr className='m-auto w-4/5 bg-orange-500 hidden h-1' />
            </Link>

            <button onClick={handleMenuBtn} className='hover:text-black hover:scale-105 duration-500'>
              Menu
              <hr className='bg-orange-500  m-auto w-4/5 hidden h-1' />
            </button>

            <button onClick={handleMobileViewBtn} className='hover:text-black hover:scale-105 duration-500'>
              MobileView
              <hr className='bg-orange-500  m-auto w-4/5 hidden h-1' />
            </button>

            <button onClick={handleContactBtn} className='hover:text-black hover:scale-105 duration-500'>
              Contact
              <hr className='bg-orange-500  m-auto w-4/5 hidden h-1' />
            </button>

            <button onClick={() => navigate('/cart')} className='hover:text-black hover:scale-105 duration-500'>
              Cart
              <hr className='bg-orange-500  m-auto w-4/5 hidden h-1' />
            </button>

          </ul>

          <div className='w-full flex justify-center mt-8'>

            <button onClick={() => setShowLogin(true)} className='bg-transparent text-xl font-medium border border-orange-200 text-gray-black rounded-full px-6 py-2 hover:bg-orange-500 shrink-0'>sign in</button>

          </div>

        </div>

      </div>

    </>
  )
}

export default App