import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='w-[18%] min-h-[100vh] border-2 border-solid border-[#a9a9a9] border-t-0 text-[max(1vw,10px)]'>

        {/* Options */}
        <div className='pt-12 pl-[10%] sm:pl-[50%] md:pl-[20%] flex flex-col gap-5'>

              <NavLink to='/add' className={({isActive}) => `${isActive ? "bg-[#fff0ed]" : ""} flex items-center gap-2 border border-solid border-[#a9a9a9] border-r-0 pl-2 py-1.5 cursor-pointer rounded-tl-[3px] rounded-bl-[3px]`}>

                <img src={assets.add_icon} alt="" />

                <p className='hidden md:flex'>Add Items</p>

            </NavLink>            

            <NavLink to="/list" className={({ isActive }) => `${isActive ? "bg-[#fff0ed]" : ""} flex items-center gap-2 border border-solid border-[#a9a9a9] border-r-0 pl-2 py-1.5 cursor-pointer rounded-tl-[3px] rounded-bl-[3px]`}>

                <img src={assets.order_icon} alt="" />

                <p className='hidden md:flex'>List Items</p>

            </NavLink>

            <NavLink to="/orders" className={({ isActive }) => `${isActive ? "bg-[#fff0ed]" : ""} flex items-center gap-2 border border-solid border-[#a9a9a9] border-r-0 pl-2 py-1.5 cursor-pointer rounded-tl-[3px] rounded-bl-[3px]`}>

                <img src={assets.order_icon} alt="" />

                <p className='hidden md:flex'>Orders</p>

            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar