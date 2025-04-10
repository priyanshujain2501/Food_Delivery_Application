import React from 'react'
import header_img from '../assets/header_img.jpg'
import {Link, useNavigate } from 'react-router-dom'

function Header() {

  return (
      <div className='flex flex-col items-center justify-center sm:flex-row w-11/12 lg:w-9/12  my-6 px-6 py-6 gap-4 bg-orange-500 mx-auto rounded-xl'>

        {/* left section */}
        <div className='sm:w-1/2 flex flex-col justify-center gap-6 sm:px-6 md:px-12 py-3 sm:py-6 animate-fadeIn'>

            <div className='w-full text-2xl sm:text-5xl text-white font-semibold'>
                <h2>Order your favourite food here</h2>
            </div>

            <div className='text-xs sm:text-sm'>

                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delcious meal at a time</p>

            </div>

            <div className=''>
                
                <a href='#explore-menu' className='bg-white px-4 py-2 rounded-full cursor-pointer hover:scale-105 duration-300 transition-all'>
                    View Menu
                </a>
                
            </div>

        </div>

        {/* right section */}
        <div className='sm:w-1/2 flex justify-center'>

            <img src={header_img} className='w-1/2 sm:w-full xl:w-10/12 rounded-full' />

        </div>

    </div>
  )
}

export default Header