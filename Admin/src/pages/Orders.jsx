import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import parcel from '../assets/parcel_icon.png'

function Orders({url}) {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {

    const res = await axios.get(`${url}/api/order/list`);

    if(res.data.success){
      setOrders(res.data.data)
    }
    else{
      toast.error(res.data.message)
    }

    console.log(res.data.data)

  }

  const statusHandler = async (e,orderId) => {

    const res = await axios.post(`${url}/api/order/status`,{orderId,status:e.target.value})

    if(res.data.success){
      await fetchAllOrders()
    }

  }

  useEffect(() => {
    fetchAllOrders()
  },[])


  return (
    <div className='w-[70%] mx-auto md:ml-12 my-6'>

      <h3 className='text-xl font-semibold '>Order Page</h3>

      <div className='mt-6 space-y-4'>
      {
        orders.map((order,index) => {
          if(order.payment === true){
            return <div key={index} className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[.5fr_2fr_0.5fr] lg:grid-cols-[.5fr_2fr_0.5fr_0.5fr_2fr_1fr] place-items-center gap-4 px-4 py-2 border'>
              
              <img src={parcel} className='' />

              <p className=''>
                {
                  order.items.map((item,index) => {
                    if(index === order.items.length-1){
                      return item.name + " X " + item.quantity
                    }
                    else{
                      return item.name + " X " + item.quantity + " , "
                    }
                  })
                }
              </p>

              <p>Items: {order.items.length}</p>

              <p>${order.amount}</p>

              <div>
                <p>{order.address.firstName} {order.address.lastName + ' , '}</p>
                <p>{order.address.street + ' , '}{order.address.city + ' , '}{order.address.state + ' , '}{order.address.country + ' , '} {order.address.zipcode}</p>
                <p>{order.address.phone}</p>
              </div>

              <select onChange={(e) => statusHandler(e,order._id)} value={order.status} className='bg-orange-100 px-2 py-3 border border-black cursor-pointer'>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          }
        })
      }
      </div>

    </div>
  )
}

export default Orders