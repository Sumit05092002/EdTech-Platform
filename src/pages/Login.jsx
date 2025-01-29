import React, { useEffect, useState } from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import login from '../assets/Images/login.webp'
import { Link } from 'react-router-dom'
import {apiConnector} from '../services/apiConnector'
import {endPoints} from '../services/apis'
import { useDispatch } from 'react-redux'
import {setToken} from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import {setUser} from '../slices/profileSlice'
import toast from 'react-hot-toast'
function Login() {
    const [formData,setFormData]=useState({Email:"",Password:""});
    function changeHandler(event){
        setFormData((prev)=>{
            return {
                ...prev,[event.target.name]:event.target.value
            }
        })
    }
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const loginHandler=async()=>{
      try {
       const response= await apiConnector("POST",endPoints.LOGIN,formData);
       console.log(response.data);
       dispatch(setToken(response.data));
       navigate('/dashboard/my-profile')
       toast.success("Logged In successfully");
       const userImage=response.data.user.image?(response.data.user.image):(`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.FirstName} ${response.data.user.LastName}`);
       const details={...response.data.user,userImage};
       console.log(details);
       dispatch(setUser({...response.data.user,userImage}));
      } catch (error) {
        toast.error(`${error.response.statusText}`);
        console.log(error);
      }
    }

    
    function submitHandler(){
      console.log(formData);
      loginHandler();
    }
  return (
    <div className='flex justify-around w-[1500px]'>
        <div className='text-white h-[500px] flex flex-col justify-around  w-[750px] mt-[100px]'>
      <div className='text-3xl font-semibold w-[500px] ml-[20px]'>
        <h1>Welcome Back</h1>
      </div>
      <div className='ml-[10px] text-xl'>
        <p>Build skills for today, tomorrow, and beyond.</p>
      <div className='italic'>
      <HighlightText txt={"Education to future-proof your career."}></HighlightText>
      </div>
      </div>
      <form action="">
        <div className='flex h-[300px] flex-col justify-around ml-[10px]'>

        <label >
            <p className='ml-[3px]'>Email <sup>*</sup></p>
            <input type="text" name='Email' placeholder='Enter your Email' className='w-[500px] pl-[20px] ' onChange={changeHandler}/>
        </label>
        <label>
            <p className='ml-[3px]'>Password <sup>*</sup></p>
            <input type="text" placeholder='Enter your Password' name='Password' className='w-[500px] pl-[20px]' onChange={changeHandler}/>
        </label>
        <div className='flex w-[500px] justify-end text-blue-300'>
            <Link to={"/forgotPassword"} className='text-blue'>Forgot Password?</Link>
        </div>
        <div className='w-[500px]'>
        <CTAButton cl={true} txt={"Sign In"} onClick={submitHandler}></CTAButton>
        </div>
        
        </div>
        
      </form>
    </div>
    <div className='mt-[100px] h-[400px] w-[400px]'>
        <img src={login} alt="" />
    </div>
    </div>
    
  )
}

export default Login
