import React from 'react'
import logo from '../assets/Navbar_logo.webp'
import {assets} from '../assets/assets.js'

function Navbar() {
  return (
    <div className='flex justify-between items-center w-full py-2 px-[4%]'>

        <div className='flex items-center gap-2'>

            <img src={logo} className='w-16 rounded-full' />

            <h1 className='text-2xl font-bold text-gray-600 '>Admin Panel</h1>

        </div>

        <img src={assets.profile_image} className='w-12 '/>

    </div>
  )
}

export default Navbar