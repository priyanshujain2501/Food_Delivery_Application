import React, { useContext} from 'react'
import { Context } from '../context/Context'
import FoodItem from './FoodItem';

function FoodDisplay({ category }) {

    const { food_list } = useContext(Context)


    return (
        <div className='flex flex-col gap-6 w-11/12 sm:w-9/12 mx-auto'>

            <h2 className='text-3xl font-medium '>Top dishes near you</h2>

            <div className='w-full grid grid-cols-auto gap-4 transition-[0.3s] animate-fadeIn'>
                {
                    food_list.map((item,index) => {
                        
                        //First check cateogory is equal to all then also check particular category
                        
                        if(category==="All" || category===item.category){
                            
                            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price} />

                        }

                    })
                }
            </div>

        </div>
    )
}

export default FoodDisplay