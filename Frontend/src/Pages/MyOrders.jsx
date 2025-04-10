import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../context/Context.jsx'
import axios from 'axios';
import {assets} from '../assets/assets2.js'

function MyOrders() {

    const { url, token } = useContext(Context);
    const [data,setData] = useState([]);

    
    const fetchOrders = async() => {

        const res = await axios.post(`${url}/api/order/userorders`,{},{headers:{token}});

        if(res.data.success){
            setData(res.data.data);
        }

    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])


  return (
    <div className='md:w-[80%] mx-2 md:mx-auto my-10'>

        <h2 className='text-lg font-bold'>My Orders</h2>

        <div className='mt-4 flex flex-col gap-4 text-sm'>

            {
                data.map((order,index)=>(
                    <div key={index} className='border border-black grid grid-cols-3 gap-y-2 md:grid-cols-[.5fr_1.5fr_1fr_1fr_1fr_1fr] place-items-center  py-3 md:gap-2'>

                        <img src={assets.parcel_icon} className='w-10'/>

                        <p className='text-xs md:text-sm'>
                            {
                                order.items.map((item,index) => {
                            
                                    if(index === order.items.length - 1){
                                        return item.name + " x " + item.quantity
                                    }
                                    else{
                                        return item.name + " x " + item.quantity + " , "
                                    }
                            
                                })
                            }
                        </p>
                        
                        <p>${order.amount}.00</p>

                        <p>Items: {order.items.length}</p>

                        <p><span className='text-orange-500'>&#x25cf;</span> <b>{order.status}</b></p>

                        <button onClick={fetchOrders} className='cursor-pointer bg-orange-100 py-2 px-3'>Track Order</button>

                    </div>
                ))
            }

        </div>
        
    </div>
  )
}

export default MyOrders