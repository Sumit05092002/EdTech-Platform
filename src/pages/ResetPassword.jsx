import React from 'react'
import { useState } from 'react'
import CTAButton from '../components/core/HomePage/CTAButton';
import { Link } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import {endPoints} from '../services/apis'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function ResetPassword() {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const navigate=useNavigate();
    async function resetHandler(){
        try {
            const data={
                Email:email
            }
            const response=await apiConnector("POST",endPoints.RESETPASSWORDTOKEN,data);
            setEmailSent(true);
            toast.success("Email sent successfully");
        } catch (error) {
            toast.error(`${error.response.statusText}`);
            navigate("/login");

        }
    }
    function changeHandler(event) {
        setEmail(event.target.value);
    }
    return (
        <div className='flex flex-col max-h-screen min-w-full justify-center items-center mt-[25px]'>
            <div className='flex flex-col h-[300px] w-[500px] justify-around mt-[150px]'>
                <h1 className='text-3xl text-white '>
                    {
                        !emailSent ? ("Reset Your Password") : ("Check your Email")
                    }
                </h1>
                <div>
                    <p className='text-lg text-richblack-500 '>
                        {!emailSent ? ("Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery") : (`We have sent the reset email to ${email}`)}
                    </p>
                </div>
                <div>
                    <form action="">
                        {
                            !emailSent ? (
                                <div>
                                    <label htmlFor=""><p className='text-white ml-[10px]'>Email <sup>*</sup></p></label>
                                    <input type="text" name='Email' onChange={changeHandler} className='w-[400px] pl-[20px] mt-[5px]' placeholder='Enter your Email ' ></input>
                                </div>) : (<div></div>)
                        }
                    </form>
                </div>
                <div className='w-[400px]'>
                    {
                        !emailSent ? (<CTAButton cl={true} txt={"Reset Password"} onClick={resetHandler}></CTAButton>) : (<CTAButton cl={true} txt={"Resend Email"} onClick={resetHandler}></CTAButton>)
                    }
                <div>
                    <Link to={"/login"}><p className='text-white ml-[10px]'>Back To Login</p></Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
