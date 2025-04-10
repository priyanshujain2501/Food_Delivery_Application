import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

function Add({url}) {

  const [image,setImage] = useState(null);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad",
  })

  const onChangeHandler = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({...data,[name]:value}))

  }

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    //FormData is a built-in JavaScript object used to create key-value pairs for sending form data, especially when dealing with file uploads.
    //It creates a new FormData object that can store form fields and files.
    //It allows you to send form data(including images and files) via an HTTP request, typically using fetch or axios.

    const formData = new FormData();

    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",data.price);
    formData.append("category",data.category);
    formData.append("image",image);

    try{
        
      const res = await axios.post(`${url}/api/food/add`, formData);

      if(res.data.success){

          setData({
            name: "",
            description: "",
            price: "",
            category: "Salad",
          })

          setImage(null);
          toast.success(res.data.message)

      }
      else{
          toast.error(res.data.message)
      }
    } 
    catch (error) {
      toast.error(error.response.data.message)
    }

  }

  return (
    <div className='w-[70%] ml-[max(5vw,25px)] text-[#6d6d6d] mt-12 text-lg'>

      <form className='flex flex-col gap-5' onSubmit={onSubmitHandler}>

        {/* Upload Image */}
        <div className='flex flex-col gap-1.5'>

          <p>Upload Image</p>
          <label htmlFor="image" className='w-30'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-[140px] cursor-pointer' />
          </label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} id='image' hidden/>
        </div>

        {/* Product Name */}
        <div className='flex flex-col gap-1.5'>

          <p>Product name</p>
          <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Type here' className='pl-2 py-1 outline w-[80%] md:w-[35%] bg-white'/>
            
        </div>

        {/* Product Description */}
        <div className='flex flex-col gap-1.5'>

          <p>Product description</p>
          <textarea name='description' rows="6" onChange={onChangeHandler} value={data.description} placeholder='Write content here' className='pl-2 py-1 outline w-[80%] md:w-[35%] h-30 bg-white'/>
            
        </div>

        {/* Category and Price */}
        <div className='flex gap-5'>

            {/* Category */}
            <div className='flex flex-col gap-1.5'>

              <p>Product category</p>

              <select name="category" onChange={onChangeHandler} value={data.category} className='outline py-1.5 px-3'>

                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>

              </select>

            </div>

            {/* Price */}
            <div className='flex flex-col gap-1.5'>

              <p>Product Price</p>

              <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='$20'className='outline py-1 pl-1.5 w-28'/>

            </div>

        </div>
        
        {/* Add button */}
        <div className=''>
          <button type='submit' className='bg-black px-6 py-1 text-white cursor-pointer'>ADD</button>
        </div>

      </form>
      
    </div>
  )
}

export default Add