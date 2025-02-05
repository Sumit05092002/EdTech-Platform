import React, { useState } from 'react'
import CTAButton from '../components/core/HomePage/CTAButton'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {apiConnector} from '../services/apiConnector'
import {endPoints} from '../services/apis'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { setSignUpData } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
export default function EmailOTP() {
    const [otp,setOTP]=useState(0);
    function changeHandler(event){
        setOTP(event.target.value);
    }
    const authData=useSelector((state)=>state.auth);
    const navigate=useNavigate()
    const dispatch=useDispatch();
    console.log(authData.signUpData.Email);
   async function submitHandler(){
        const signupdata=authData.signUpData
        const OTP=Number(otp);
        const data={...signupdata,otp:OTP}
        console.log(data);

        try {
            const response=await apiConnector("POST",endPoints.SIGNUP,data);
            toast.success("User registered sccessfully");
            navigate("/login");
            dispatch(setSignUpData(null));
        } catch (error) {
            navigate("/signUp")
            toast.error(`${error.response.statusText}`)
        }

        
    }
    async function sendOTP(){
        try {
            const data={
                Email:authData.signUpData.Email
            }
            const response=await apiConnector("POST",endPoints.SENDOTP,data);
            toast.success("OTP sent successfully");
        } catch (error) {
            toast.error("Error sending OTP");
        }
    }
    return (
        <div className='flex h-[600px] min-w-full justify-center items-center text-white'>
            <div className='flex h-[400px] w-[400px] flex-col justify-around'>

                <div className='text-3xl flex'>
                    <h1>Verify Email</h1>
                </div>
                <div className='text-xl'>
                    <p>A verification code has been sent to you. Enter the code below</p>
                </div>
                <div>
                    <input type="text" className='w-[300px] lg:w-[395px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 ' placeholder='Enter your OTP' onChange={changeHandler} name='otp'/>
                </div>
                <div>
                    <CTAButton cl={true} txt={"Verify Email"} onClick={submitHandler}></CTAButton>
                </div>
                <div className='flex justify-between'>
                    <Link to={"/signUp"}>Back to SignUp</Link>
                    <Link className='text-blue-200' onClick={sendOTP}>Resend OTP</Link>
                </div>
            </div>
        </div>
    )
}
