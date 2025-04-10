import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

function Cart() {

  const [message,setMessage] = useState("")
  

  const {cartItems,food_list,removeFromCart,getCartTotalAmt,promoCodes,promo,setPromo,discountedAmt,setDiscountedAmt,isPromoApplied,setIsPromoApplied,url} = useContext(Context)

  const navigate = useNavigate();

  const checkPromo = () => {

    for (const item in promoCodes) {
      if (item === promo) {
        return true;
      }
    }
    return false;
  }

  const handlePromoBtn = () => {

    if (checkPromo()) {
      setIsPromoApplied(true);
      setMessage("Promo applied successfully");
    } else {
      setIsPromoApplied(false);
      setMessage("Promo is not valid");
      setDiscountedAmt(0);
    }

  }

  useEffect(() => {

    //off upto 80 dollars
    if(!checkPromo()){
      setDiscountedAmt(0);
      setMessage("Promo is not valid");
    }

    if(checkPromo() && isPromoApplied){
      const discountValue = Math.floor(Math.min(getCartTotalAmt() * (promoCodes[promo] / 100), 80))
      setDiscountedAmt(discountValue)
    }
    else{
      setIsPromoApplied(false)
    }
    
  },[cartItems,promo,isPromoApplied,getCartTotalAmt(),setDiscountedAmt])

  
  return (
    <div className='mt-20 mx-10 md:mx-32 lg:mx-44'>

      <div className=''>

        <div className='grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-gray-400 text-sm items-center place-items-center'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {
          food_list.map((item,index)=>{

            if(cartItems[item._id] > 0){
              return (
                <div>

                  <div key={index} className='grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-sm my-2.5 text-black place-items-center'>

                    <img src={url + "/images/" + item.image} className='w-16 rounded-xl' />

                    <div>{item.name}</div>

                    <div>${item.price}</div>

                    <div>{cartItems[item._id]}</div>

                    <div>${cartItems[item._id] * item.price}</div>

                    <RxCrossCircled onClick={() => removeFromCart(item._id)} className='cursor-pointer text-lg'/>

                   

                  </div>

                  < hr className='h-[1px] bg-gray-500'/>

                </div>

              )

              
              
            }
            
            

          })
        }

      </div>

      {/* Bill section */}
      <div className='mt-20 flex flex-col-reverse sm:flex-row justify-between gap-[max(10vw,10px)]'>

        <div className='flex-1 flex flex-col  gap-5'>

          <h2 className='text-md sm:text-2xl font-semibold'>Cart Totals</h2>

          <div className=''>

            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>${getCartTotalAmt()}</p>
            </div>

            <hr className='my-2.5'/>

            <div className='flex justify-between'>
              <p>Delivery Fee</p>
              <p>${getCartTotalAmt()===0 ? 0 : 2}</p>
            </div>

            <hr className='my-2.5' />

            <div className={`justify-between ${getCartTotalAmt() > 0 && discountedAmt !== 0 ? "flex" : "hidden"}`}>
              <p>Promo</p>
              <p>${getCartTotalAmt() > 0 && discountedAmt===0 ? "" : discountedAmt}</p>
            </div>

            <hr className={`my-2.5 ${getCartTotalAmt() > 0 && discountedAmt !== 0 ? "block" : "hidden"}`} />

            <div className='flex justify-between'>
              <b>Total</b>
              <b>${getCartTotalAmt()===0 ? 0 : getCartTotalAmt()+2-discountedAmt}</b>
            </div>

          </div>

          <button onClick={() => navigate("/order")} className='text-white bg-orange-500 py-3 text-xs w-[max(15vw,150px)]'>PROCCED TO CHECKOUT</button>

        </div>

        <div className='flex-1'>

          <div className=''>

            <p className='text-gray-500'>If you have a promo code, Enter it here</p>

            <div className='mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded-md'>

              <input type="text" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder='promo code' className='border-none outline-none bg-transparent pl-2.5 w-2/3'/>

              <button onClick={handlePromoBtn} className='w-1/2 sm:w-1/3 bg-black text-white py-2.5 rounded-md'>Submit</button>

            </div>

            <p className='mt-2 text-gray-500'>{message}</p>
            
          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart