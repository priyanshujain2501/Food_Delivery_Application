import React, { useContext, useEffect } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {Context} from '../context/Context.jsx'
import axios from 'axios';

function Verify() {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const {url} = useContext(Context)

    const navigate = useNavigate()

    const verifyPayment = async () => {
        const res = await axios.post(`${url}/api/order/verify`,{success,orderId});

        if(res.data.success){
            navigate('/myorders')
        }
        else{
            navigate('/')
        }

    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='min-h-[60vh] grid'>

        <div className='w-[100px] h-[100px] place-self-center border-4 border-solid border-[#bdbdbd] border-t-orange-500 rounded-[50%] animate-rotate'>
        </div>
        
    </div>
  )
}

export default Verify