import React, { useContext, useState } from 'react'
import NavbarIcon from '../assets/NavbarIcon.webp'
import {assets} from '../assets/assets2.js'
import {Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context.jsx';
import { FiAlignJustify } from "react-icons/fi";

function Navbar({setShowLogin,mobileView,setMobileView}) { 

    const navigate = useNavigate();

    const {getCartTotalAmt,token,setToken} = useContext(Context);


    const handleMenuBtn = () => {

        if (location.pathname === '/') {

            const targetElement = document.getElementById('explore-menu')

            if (targetElement) {
                targetElement.scrollIntoView()
            }

        }
        else {

            navigate('/')

            setTimeout(() => {
                const targetElement = document.getElementById('explore-menu')

                if (targetElement) {
                    targetElement.scrollIntoView()
                }

            }, 200)

        }

    }

    const handleMobileViewBtn = () => {

        if (location.pathname === '/') {

            const targetElement = document.getElementById('app-download')

            if (targetElement) {
                targetElement.scrollIntoView()
            }

        }
        else {

            navigate('/')

            setTimeout(() => {
                const targetElement = document.getElementById('app-download')

                if (targetElement) {
                    targetElement.scrollIntoView()
                }

            }, 100)

        }

    }

    const handleContactBtn = () => {

        if (location.pathname === '/') {

            const targetElement = document.getElementById('footer')

            if (targetElement) {
                targetElement.scrollIntoView()
            }

        }
        else {

            navigate('/')

            setTimeout(() => {
                const targetElement = document.getElementById('footer')

                if (targetElement) {
                    targetElement.scrollIntoView()
                }

            }, 100)

        }

    }

    const logout = () => {

        localStorage.removeItem("token")
        setToken("")
        navigate('/')

    }

    return (
        <div className={`w-full flex items-center justify-between px-2 py-4 lg:px-12 text-black text-semibold`}>
            
            {/* Heading */}
            <div onClick={() => navigate('/')} className='flex gap-2 items-center'>

                <img src={NavbarIcon} className='flex items-center w-8 h-8 sm:w-14 sm:h-14 rounded-full hover:cursor-pointer hover:scale-105 duration-500'/>

                <div className='flex items-center text-lg sm:text-2xl font-bold hover:cursor-pointer shrink-0 hover:scale-105 duration-500 hover:text-orange-500'>Food Delivery System</div>

            </div>

            {/* Middle List */}
            <div className='hidden md:block'>

                <ul className='flex items-center flex-row gap-3 text-lg px-2 lg:px-4 hover:cursor-pointer'>

                    <Link to='/' className='hover:text-orange-500 hover:scale-105 duration-500'>
                        Home
                        <hr className='m-auto w-4/5 bg-orange-500 hidden h-1'/>
                    </Link>

                    <button onClick={handleMenuBtn} className='hover:text-orange-500 hover:scale-105 duration-500'>
                        Menu
                        <hr className='bg-orange-500  m-auto w-4/5 hidden h-1' />
                    </button>

                    <button onClick={handleMobileViewBtn} className='hover:text-orange-500 hover:scale-105 duration-500'>
                        MobileView
                        <hr className='bg-orange-500  m-auto w-4/5 hidden h-1' />
                    </button>
                    
                    <button onClick={handleContactBtn} className='hover:text-orange-500 hover:scale-105 duration-500'>
                        Contact
                        <hr className='bg-orange-500  m-auto w-4/5 hidden h-1' />
                    </button>

                </ul>

            </div>
            
            {/* End Part */}
            <div className='flex items-center justify-center gap-4 lg:gap-6'>

                {/* <img src={assets.search_icon} 
                className='cursor-pointer' /> */}

                <div className='hidden sm:flex items-center justify-center gap-4 lg:gap-6'>

                    <div className='relative'>
                        <Link to='/cart' ><img src={assets.basket_icon} className='cursor-pointer min-w-6 min-h-6' /></Link>
                        <div className={`${getCartTotalAmt() === 0 ? "hidden" : "block"} absolute min-w-2.5 min-h-2.5 bg-orange-500 rounded-full top-[-10px] right-[-10px]`}></div>
                    </div>

                    {!token
                        ? <button onClick={() => setShowLogin(true)} className='bg-transparent text-lg border border-orange-200 text-gray-black rounded-full px-4 py-1 hover:bg-orange-500 shrink-0'>sign in</button> 
                        : <div className='relative group'>
                            <img src={assets.profile_icon} />
                            <ul className='absolute right-0 z-1 hidden group-hover:flex flex-col gap-2.5 bg-[#fff2ef] px-6 py-3 my-1 border-2 border-solid border-orange-500 outline-2 outline-white duration-500'> 
                                <li onClick={() => navigate("/myorders")} className='flex justify-center items-center gap-1 cursor-pointer'><img src={assets.bag_icon} className='w-5' /><p className='hover:text-orange-500'>Orders</p></li>
                                <hr />
                                <li className='flex justify-center items-center gap-1 cursor-pointer'><img src={assets.logout_icon} className='w-5' /><p onClick={logout} className='hover:text-orange-500'>Logout</p></li> 
                            </ul>
                        </div>
                    }

                </div>

                <div onClick={() => setMobileView(true)} className={`
                    ${mobileView===true? "hidden" : "flex"} flex items-center md:hidden text-2xl`}>
                    <FiAlignJustify className='cursor-pointer'/>
                </div>

            </div>

        </div>
    )
}

export default Navbar