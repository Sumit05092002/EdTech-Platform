import React from 'react'
import { useState } from 'react'
import CTAButton from '../components/core/HomePage/CTAButton';
import { Link } from 'react-router-dom';
function ResetPassword() {
    const [email, setEmail] = useState("");
    function changeHandler(event) {
        setEmail(event.target.value);
    }
    function submitHandler(){
        console.log(email);
    }
    return (
        <div className='flex h-[500px] min-w-max justify-center items-center text-white'>
            <div className='flex h-[350px] w-[500px] flex-col justify-around'>
                <div className='text-3xl'>
                    Reset Your Password
                </div>
                <div>
                    <p className='text-lg'>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
                </div>
                <div>
                    <form action="">
                        <p>Email Address<sup>*</sup></p>
                        
                        <input type="text" name='Email' onChange={changeHandler} placeholder='Enter your Email' className='w-[450px] mt-[5px] pl-[20px]'/>
                    </form>
                </div>
                <div className='w-[450px]'>
                    <CTAButton cl={true} txt={"Submit"} onClick={submitHandler}></CTAButton>
                </div>
                <div className='text-lg ml-[5px]'>
                   <Link to={"/login"}><p>Back to Login</p></Link> 
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
