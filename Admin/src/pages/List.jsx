import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { GiCancel } from "react-icons/gi";

function List() {

  const url = "http://localhost:3000";

  const [list,setList] = useState([]);

  

  const fetchList = async () => {

    const res = await axios.get(`${url}/api/food/list`);

    if(res.data.success){
        setList(res.data.data);
    }
    else{
      toast.error("Error");
    }

  }

  const removeHandler = async (foodId) => {

    const res = await axios.post(`${url}/api/food/remove`,{id:foodId})

    await fetchList();

    if(res.data.success){
      toast.success(res.data.message)
    }
    else{
      toast.error("Error")
    }

  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='w-[70%] ml-[max(5vw,25px)] text-[#6d6d6d] mt-12 text-lg mb-10'>

      <p className='pb-2'>All Foods List</p>

      <div className='flex flex-col'>

        <div className='grid grid-cols-5 px-5 border bg-gray-50 py-1 '>

            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>

        </div>

        {
          list.map((item,index)=>{
            return( 
              <div key={index} className='grid grid-cols-5 pl-6 border border-gray-200 py-2'>

                <img src={`${url}/images/${item.image}`} className='w-10 rounded' />
                
                <p>{item.name}</p>

                <p>{item.category}</p>

                <p>{item.price}</p>

                <p onClick={() => removeHandler(item._id)} className='flex items-center text-2xl cursor-pointer'><GiCancel/></p>

              </div>
            )
          })
        }

      </div>
        
    </div>
  )
}

export default List