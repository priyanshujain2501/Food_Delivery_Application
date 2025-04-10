import React from 'react'
import { assets } from '../assets/assets2'

function AppDownload() {
  return (
    <div id='app-download' className='w-full my-16 sm:my-32  flex flex-col justify-center items-center gap-6 sm:gap-12'>
    
        <h1 className='flex justify-center w-full mx-auto flex-col items-center text-xl text-center sm:text-5xl sm:w-1/2 font-medium gap-4'>For Better Experience Download Our App</h1>
        

        <div className='w-full flex sm:gap-6 cursor-pointer justify-center'>

            <div className='flex justify-center'>
                  <img src={assets.play_store} className='w-3/4 sm:w-full hover:scale-105 duration-500'/>
            </div>

            <div className='flex justify-center'>
                <img src={assets.app_store} className='w-3/4 sm:w-full hover:scale-105 duration-500'/>
            </div>

        </div>

    </div>
  )
}

export default AppDownload