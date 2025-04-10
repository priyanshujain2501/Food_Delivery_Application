import React, { useContext,useEffect,useState } from 'react'
import { Context } from '../context/Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function PlaceOrder() {

  const { getCartTotalAmt, discountedAmt,token,food_list,cartItems,url} = useContext(Context)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const navigate = useNavigate();

  const onChangeHandler = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({...data,[name]:value}))

  }

  const placeOrder = async (e) => {
      
    e.preventDefault();

    let orderItems = [];

    food_list.map((item) => {

        if(cartItems[item._id]>0){
            let itemInfo = item
            itemInfo["quantity"] = cartItems[item._id]
            orderItems.push(itemInfo)
        }

    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getCartTotalAmt() + 2, //- discountedAmt,
      // promoAmt: discountedAmt, 
      paymentType:"COD",
    }

    let res = await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})

    if(res.data.success){
      const {session_url} = res.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }

  }

  useEffect(() => {
    if(!token){
      navigate("/cart")
    }
    else if(getCartTotalAmt() === 0){
      navigate("/cart")
    }
  },[token])


  return (
    <div className='w-full'>

      <form onSubmit={placeOrder} className='w-10/12 md:w-9/12 mx-auto mt-10 flex flex-col sm:flex-row items-start justify-between gap-6'>

        {/* left */}
        <div className='w-full sm:w-1/2 lg:w-full md:max-w-[max(30%,500px)] '>

          <p className='font-semibold text-2xl mb-10'>Delivery Information</p>

          <div className='flex gap-2.5'>
            <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2'/>
            <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2' />
          </div>

          <input required type="text" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2' />
          <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2' />

          <div className='flex gap-2.5'>
            <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2' />
            <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2' />
          </div>

          <div className='flex gap-2.5'>
            <input required type="Number" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2' />
            <input required type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2'/>
          </div>

          <input required type="telephone" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' className='mb-3 w-full border border-[#c5c5c5] outline-orange-500 p-2' />

        </div>

        {/* right */}
        <div className='flex-1 flex flex-col  gap-5 w-full max-w-[max(40%,500px)]'>

          <h2 className='text-md sm:text-2xl font-semibold'>Cart Totals</h2>

          <div className=''>

            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>${getCartTotalAmt()}</p>
            </div>

            <hr className='my-2.5' />

            <div className='flex justify-between'>
              <p>Delivery Fee</p>
              <p>${getCartTotalAmt()===0? 0 : 2}</p>
            </div>

            <hr className='my-2.5' />

            <div className={`justify-between ${discountedAmt === 0 ? "hidden" : "flex"}`}>
              <p>Promo</p>
              <p>${discountedAmt === 0 ? "" : discountedAmt}</p>
            </div>

            <hr className={`my-2.5 ${discountedAmt === 0 ? "hidden" : "block"}`} />

            <div className='flex justify-between'>
              <b>Total</b>
              <b>${getCartTotalAmt()===0? 0 : getCartTotalAmt() + 2 - discountedAmt}</b>
            </div>

          </div>

          <div className='flex justify-between w-full'>

            <button type='submit' className='flex justify-center text-center  text-white bg-orange-500 px-3 py-2 sm:py-3 text-xs mt-7'>PROCCED TO PAYMENT</button>

            <button onClick={() => navigate("/splitbill")} className='text-white bg-orange-500 py-2 sm:py-3 px-3 text-xs mt-7'>SPLIT BILL</button>

          </div>

        </div>

      </form>

    </div>
  )
}

export default PlaceOrder