import React, { useState } from 'react'
import CTAButton from '../components/core/HomePage/CTAButton'
import {apiConnector} from '../services/apiConnector'
import {endPoints} from '../services/apis'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
export default function UpdatePassword() {
    const [formData,setFormData]=useState({password:"",confirmPassword:""});

    function changeHandler(event){
        setFormData((prev)=>{
            return {
                ...prev,[event.target.name]:event.target.value
            }
        })
    }

    const {id}=useParams();
    const navigate=useNavigate();

    async function submitHandler() {
        const data={...formData,token:id}
        console.log(data);
        try {
            const response=await apiConnector("POST",endPoints.RESETPASSWORD,data);
            toast.success("Password Updated Successfully");
            navigate("/login");

        } catch (error) {
            toast.error(`${error.response.statusText}`);
        }
    }
    return (
        <div className='flex max-h-screen min-w-full items-center justify-center '>
            <div className='flex flex-col h-[400px] w-[500px] justify-around mt-[150px]'>
                <div>
                    <h1 className='text-3xl text-white'>Choose New Password</h1>
                </div>
                <div className='text-richblack-500 text-lg w-[250px] flex justify-center'>
                    <p>Almost done.Enter your password and you are all set.</p>
                </div>
                <div>
                    <p className='text-white'>Password <sup>*</sup></p>
                    <input type="text" className='w-[350px] pl-[20px]' placeholder='Enter your Password' name='password' onChange={changeHandler}/>
                </div>
                <div>
                    <p className='text-white'>Confirm Password <sup>*</sup></p>
                    <input type="text" className='w-[350px] pl-[20px]' placeholder='Enter your Confirm Password' name='confirmPassword' onChange={changeHandler}/>
                </div>
                <div className='w-[350px]'>
                    <CTAButton cl={true} txt={"Submit"} onClick={submitHandler}></CTAButton>
                </div>
            </div>
        </div>
    )
}
