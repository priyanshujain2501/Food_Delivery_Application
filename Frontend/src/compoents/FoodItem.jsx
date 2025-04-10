import React,{useContext} from 'react'
import { assets } from '../assets/assets2'
import { Context } from '../context/Context';

function FoodItem({id,name,description,image,price}) {

    const {cartItems,addToCart,removeFromCart,url} = useContext(Context)

    return (

        <div className='border rounded-xl flex flex-col'>
            
            <div className='relative'>
                
                <img src={url + "/images/" + image} className='rounded-t-xl w-full' />
                {
                    !cartItems[id]
                        ? <img onClick={() => addToCart(id)} src={assets.add_icon_white} className='w-9 absolute bottom-4 right-4 cursor-pointer rounded-[50px]' />
                        : <div className='absolute bottom-4 right-4 flex items-center gap-2 rounded-[50px] 
                                        p-1.5 bg-white'>

                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />

                        </div>
                }
            </div>


            <div className='py-6 px-4 space-y-2'>

                <div className='w-full flex flex-row justify-between items-center'>
                    <p className='text-xl font-semibold'>{name}</p>
                    <img src={assets.rating_starts} className='h-1/4 w-1/4' />
                </div>

                <div className='text-xs text-gray-500 '>
                    <p>{description}</p>
                </div>

                <div className='text-orange-500'>
                    <p>${price}</p>
                </div>

            </div>

        </div>
    )
}

export default FoodItem