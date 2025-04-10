import React, { useState } from 'react'
import Header from '../compoents/Header'
import ExploreMenu from '../compoents/ExploreMenu'
import FoodDisplay from '../compoents/FoodDisplay'
import AppDownload from '../compoents/AppDownload'

function Home() {

  const [category,setCategory] = useState("All")

  return (
    <div id='home' className='w-full h-1/2'>
        
        <div className=''>

          <Header/>
          <ExploreMenu category={category} setCategory={setCategory}/>
          <FoodDisplay category={category}/>
          <AppDownload/>

        </div>

    </div>
  )
}

export default Home