import React from 'react'
import NavbarIcon  from '../assets/NavbarIcon.webp'

function Footer() {
  return (
    <div id='footer' className='px-4 md:px-10 bg-[#323232] mt-20 pt-1'>

      <div className='flex flex-col sm:items-start sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm '>

        {/* Left Section */}

        <div className='w-full sm:w-full mx-auto'>
          
          <div className='flex flex-col sm:flex-row mb-4 gap-2'>

            {/* <img src={NavbarIcon} className='flex items-center w-8 sm:w-14 rounded-full hover:cursor-pointer' /> */}

            <div className='flex text-xl sm:text-2xl font-bold hover:cursor-pointer text-orange-500'>Food Delivery System</div>

          </div>

          <p className='w-full md:2/3 text-white leading-6'>
            We offer customers an easy and convenient way to browse menus, place orders, and track deliveries. It ensures a seamless experience with a user-friendly interface, secure payments, and real-time updates for a hassle-free dining experience.</p>
        </div>

        {/* Center Section */}

        <div className='text-white'>

          <p className='text-xl font-medium mb-4'>COMPANY</p>

          <ul className='flex flex-col gap-2 text-gray-200'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>

        </div>

        {/* Right Section */}

        <div className='w-full flex flex-col '>

          <p className='text-xl font-medium mb-4 text-white'>GET IN TOUCH</p>

          <ul className='flex flex-col gap-2 text-gray-200'>
            <li>+91-8435110529</li>
            <li>mailto.priyanshu2000@gmail.com</li>
          </ul>

        </div>

      </div>

      {/* Copyright text */}

      <div className='text-gray-200'>

        <hr />

        <p className='py-5 text-sm text-center'>Copyright 2024 @ priyanshu - All Right Reserved.</p>

      </div>

    </div>
  )
}

export default Footer