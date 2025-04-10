import React from 'react'
import { menu_list } from '../assets/assets2'

function ExploreMenu({category,setCategory}) {
  return (
    <div id='explore-menu' className='flex flex-col w-11/12 lg:w-9/12 my-20 mx-auto gap-6 '>
        
        <div className='text-3xl font-medium'>
            <h1 >Explore our menu</h1>
        </div>

        <div className='text-sm text-gray-500'>
            <p>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delcious meal at a time</p>
        </div>

          <div className='flex justify-between items-center gap-4 sm:gap-7 my-4 overflow-x-scroll text-center hide-scrollbar'>
            {
                menu_list.map((item,index) => (
                    <div onClick={() => setCategory(prev => prev===item.menu_name ? "All" : item.menu_name)} key={index} className='flex-shrink-0           cursor-pointer'>
                        <img src={item.menu_image} className={`${category === item.menu_name ? "border-4 border-orange-500 p-[2px]" : ""} sm:w-32 rounded-[50%]`}/>
                        <p className='text-gray-500 mt-2'>{item.menu_name}</p>
                    </div>
                ))
            }
        </div>

        <hr className='h-[2px] border-none bg-gray-500' />

    </div>
  )
}

export default ExploreMenu