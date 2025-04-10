import React, { useContext, useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { Context } from '../context/Context';
import axios from 'axios'

function LoginPopup({setShowLogin}) {

    const [currState,setCurrState] = useState("Login")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
    })
    const {url,token,setToken} = useContext(Context)

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(dta => ({...dta,[name]:value}))

    }

    const onLogin = async(e) => {

        e.preventDefault();

        let newUrl = url;

        if(currState === "Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        try {

            const res = await axios.post(newUrl, data);

            if(res.data.success) {
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                setShowLogin(false);
            }
            else{
                alert(res.data.message)
            }

        } 
        catch (error) {
            alert(error.response.data.message)
        }


    }


    return (
        <div className='absolute z-10 w-full h-screen bg-[#00000090] grid place-items-center'>

            <form onSubmit={onLogin} className=' text-[#808080] animate-fadeIn w-80 h-[55%] xl:h-[48%] flex flex-col bg-white p-5 space-y-4 rounded-lg mb-36 md:mb-16'>

                {/* Heading and cancel */}  
                <div className='flex justify-between'>
                    
                    <h2 className='text-xl text-black font-semibold'>{currState}</h2>

                    <RxCrossCircled onClick={() => setShowLogin(false)} className='w-7 h-7 text-black cursor-pointer'/>

                </div>

                {/* Input fields */}
                <div className='flex flex-col w-full gap-4'>
                {
                        currState === "Login" ? <></> : <input name='name' type="text" onChange={onChangeHandler} value={data.name} placeholder='Your Name' className='pl-1 border border-gray-400 py-1 rounded-sm text-sm'/>
                }
                    <input name='email' type="email" onChange={onChangeHandler} value={data.email} placeholder='Your email' className='pl-1 border border-gray-400 py-1 rounded-sm text-sm'/>
                    
                    <input name='password' type="password" onChange={onChangeHandler} value={data.password} placeholder='Password' className='pl-1 border border-gray-400 py-1 rounded-sm text-sm'/>

                </div>

                {/* Login and Signup button */}
                <div>
                    <button type='submit' className='bg-orange-500 w-full text-white py-1 sm:py-2 rounded-md cursor-pointer'>{currState==="Sign Up"?"Create account":"Login"}</button>
                </div>

                <div className='flex items-start gap-2 mt-[-15px]'>
                    <input type="checkbox" className='mt-[5px] cursor-pointer'/>
                    <p className='text-xs sm:text-sm '>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>

                <div>
                    {
                        currState==="Login"
                        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} className='cursor-pointer text-orange-500'>Click here</span></p>
                        : <p>Already have an account? <span onClick={()=>setCurrState("Login")} className='cursor-pointer text-orange-500'>Login here</span></p>
                    }
                </div>

            </form>

        </div>
    )
}

export default LoginPopup