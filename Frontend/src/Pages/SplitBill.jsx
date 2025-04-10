import React, { useContext, useState } from 'react'
import { Context } from '../context/Context'
import unknown_image from '../assets/unknown_image.jpeg'
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function SplitBill() {

    const [showInp, setShowInp] = useState(false);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [showDelete,setShowDelete] = useState(false)

    const { getCartTotalAmt, discountedAmt,members,setMembers} = 
    useContext(Context);

    const navigate = useNavigate()

    const handleAddBtn = () => {

        setShowInp(false);

        if(name && contact){

            setMembers(prev => [...prev, {_id:Date.now(),contact,name}])

            setName("")
            setContact("")
        }

    }

    const handleAddMemberBtn = () => {

        setShowInp(true)
        setShowDelete(false)

    }

    const handleTrashIcon = (id) => {

        setMembers(prevMembers => prevMembers.filter((member) => member._id !== id))

    }
  
    let totalAmt = getCartTotalAmt() + 2 - discountedAmt;
    let eachPersonAmt = Number(((totalAmt) / (members.length + 1)).toFixed(2));
    let amtPaidByOthers = eachPersonAmt * members.length;
    let yourAmt = Number((getCartTotalAmt() + 2 - discountedAmt - amtPaidByOthers).toFixed(2))

  return (
    <div className='w-full sm:w-[65%] mx-auto px-6 md:px-10 mt-12 sm:mt-20 flex flex-col gap-6' >
        
        {/* Title */}
        <div className='text-2xl sm:text-5xl flex justify-center font-bold'>
            <h1>Split Bill Amount</h1>
        </div>

        {/* Display total amount */}
        <div className='sm:my-8 flex justify-between items-center w-full md:w-3/4 mx-auto md:text-2xl text-white bg-green-400 px-2 md:px-4 py-3 rounded-2xl font-medium text-center'>

            <div className='w-1/2 flex flex-col items-center gap-2 border-r-2 border-white'>
                <p className=''>Total Bill Amount</p>
                <p>${getCartTotalAmt()===0 ? 0 : getCartTotalAmt() + 2 - discountedAmt}</p>
            </div>

            <div className='w-1/2 flex flex-col items-center gap-2'>
                <p>Percentage Split</p>
                <p>{getCartTotalAmt()===0? 0 : (100 / (members.length + 1)).toFixed(2)}%</p>
            </div>

        </div>

        {/* Show members */}
        <div className='flex flex-col gap-4 '>
            {
                members.length > 0 && members.map((item,index)=>(
                    <div key={index} className='border-2 border-gray-400 flex justify-between p-3 sm:p-6 shadow-xl shadow-gray-400'>
                        
                            {/* Left Section */}
                            <div className='flex gap-6'>

                                <img src={unknown_image} className='w-20 h-20 rounded-full'/>

                                <div className='flex flex-col justify-center gap-1.5'>

                                    <p className="text-xl sm:text-3xl capitalize font-semibold">{item.name}</p>

                                    <p className='font-medium'>{item.contact}</p>

                                </div>

                            </div>

                            {/* Right Section */}
                            <div className={`flex-col justify-center items-center gap-1.5 ${showDelete===true? "hidden" : "flex"}`}>
                                <p className='text-xl font-semibold'>Amount</p>
                                <p className='sm:text-lg font-medium'>${getCartTotalAmt() === 0 ? 0 : eachPersonAmt}</p>
                            </div>

                            <div className={`${members.length > 0 && showDelete === true ? "flex" : "hidden"} w-2/12 items-center justify-center`}>
                                <FaTrash onClick={() => handleTrashIcon(item._id)} className="text-3xl cursor-pointer hover:scale-105 duration-500" />
                            </div>
                        
                    </div>)
                )
            }
        </div>

        {/* add and remove btn */}
        <div className='flex justify-center gap-6'>

              <div className={`${showInp === false ? "block" : "hidden"} flex justify-center my-6`}>
                  <button onClick={handleAddMemberBtn} className='bg-green-400 px-4 py-2 rounded-xl hover:bg-orange-500 duration-300 text-white text-xl'>Add a member</button>
              </div>

              <div className={`${showInp === false && showDelete === false ? "block" : "hidden"} flex justify-center my-6`}>
                  <button onClick={() => setShowDelete(true)} className='bg-red-600 px-4 py-2 rounded-xl hover:bg-orange-500 duration-300 text-white text-xl'>Remove</button>
              </div>

              <div className={`${showInp===false && members.length>0 && showDelete === true ? "block" : "hidden"} flex justify-center my-6`}>
                  <button onClick={() => setShowDelete(false)} className='bg-red-600 px-4 py-2 rounded-xl hover:bg-orange-500 duration-300 text-white text-xl'>Don't remove</button>
              </div>

        </div>

        {/* input fields and submit,close btn */}
        <div className={`${showInp===false? "hidden" : "flex"} w-full flex-col xl:flex-row gap-6 mt-2 items-center justify-center`}>

            <div className='flex flex-col sm:flex-row gap-2'>

                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='border-2 py-2 pl-2 outline-orange-500 border-gray-400 rounded-lg' />

                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder='Upi id' className='border-2 py-2 pl-2 outline-orange-500 border-gray-400 rounded-lg' />

            </div>

            <div className='flex gap-2 md:ml-2'>

                <button onClick={handleAddBtn} className='text-xl border bg-green-400 text-white px-4 py-2 rounded-xl hover:bg-orange-500 duration-300'>Submit</button>

                <button onClick={() => setShowInp(false)} className='text-xl border bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-orange-500 duration-300'>Close</button>

            </div>

        </div>

        {/* Show your amount or cart */}
        <div className='w-full flex flex-col items-center  mt-6 md:mt-12 '>

              <div className='w-full max-w-[max(30%,500px)] flex flex-col gap-5'>

                <h2 className='text-md sm:text-2xl font-semibold'>Cart Totals</h2>

                <div className=''>

                    <div className='flex justify-between'>
                        <p>Total Bill</p>
                        <p>${getCartTotalAmt() === 0 ? 0 : getCartTotalAmt() + 2 - discountedAmt}</p>
                    </div>

                    <hr className='my-2.5' />

                    <div className='flex justify-between'>

                        <b>Your Amount</b>
                        <b>${getCartTotalAmt() === 0 ? 0 : yourAmt}</b>

                    </div>

                </div>

                <div className='flex justify-between'>

                    <button onClick={() => navigate('/order')} className='flex justify-center text-center  text-white bg-green-400 hover:bg-orange-500 duration-300 px-3 py-2 sm:py-3 text-xs mt-7'>
                        Back
                    </button>

                    <a href="/" className='flex justify-center text-center  text-white bg-green-400 hover:bg-orange-500 duration-300 px-3 py-2 sm:py-3 text-xs mt-7'>
                        PROCCED TO PAYMENT
                    </a>

                </div>

            </div>

        </div>
        
    </div>
  )
}

export default SplitBill
