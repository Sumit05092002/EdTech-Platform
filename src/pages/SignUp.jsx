import React, { useEffect, useState } from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import image from '../assets/Images/signup.webp'
import CTAButton from '../components/core/HomePage/CTAButton'
import RoleButton from '../components/core/signup/RoleButton'
import {apiConnector} from '../services/apiConnector'
import {endPoints} from '../services/apis'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {setSignUpData} from '../slices/authSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
function SignUp() {
    const [active, setActive] = useState("Student");
    // useEffect(() => {
    //     console.log(active);
    // })

    const [formData,setFormData]=useState({FirstName:"",LastName:"",Email:"",Password:"",ConfirmPassword:"",accountType:""})

    function changeHandler(event){
        setFormData((prev)=>{
            return {
                ...prev,[event.target.name]:event.target.value
            }
        })
    }
    
    const navigate=useNavigate();
    const dispatch=useDispatch();

    async function signUpHandler(){
        console.log(formData);
        const body={
            Email:formData.Email
        }
        try {
            const response=await apiConnector("POST",endPoints.SENDOTP,body);
            toast.success("OTP sent successfully");
            dispatch(setSignUpData(formData));
            navigate("/email-verification");
            
        } catch (error) {
            toast.error(`${error.response.statusText}`)
        }
    }

    function submitData(){
        signUpHandler();
    }

    useEffect(()=>{
        setFormData((prev)=>{
            const update={...prev,accountType:active}
            return update;
    })
    },[active])

    
    return (
        <div className='text-white flex gap-20 mt-[70px] min-h-screen'>
            <div className='w-[800px]  flex flex-col justify-between h-[500px] ml-[100px] '>
                <h1 className='text-3xl w-[450px] font-semibold'>Join the millions learning to code with StudyNotion for free</h1>
                <div>
                    <p className='text-xl font-semibold text-pure-greys-200'>Build skills for today, tomorrow, and beyond.</p>
                    <br />
                    <div className='text-xl font-bold italic'>
                        <HighlightText txt={"Education to future-proof your career."}></HighlightText>
                    </div>

                </div>
                <br />
                <div>
                
                        <div className="flex w-[200px] gap-2 bg-richblack-700 rounded-3xl justify-around mb-[10px] h-[50px] ">
                            <RoleButton active={active} setActive={setActive}></RoleButton>
                        </div>
                        <br />
                        <form action="">
                        <div className='flex flex-col justify-around h-[300px] '>
                            <div className='flex gap-5 '>

                                <label >
                                    <p>Firstname <sup>*</sup> </p>
                                    <input type="text" name='FirstName' placeholder='Enter your Firstname' className='text-black form-style pl-[20px]' onChange={changeHandler}/>
                                </label>
                            


                                <label >
                                    <p>Lastname <sup>*</sup></p>
                                    <input type="text" name='LastName' placeholder='Enter your Lastname' className='text-black pl-[20px]' onChange={changeHandler}/>
                                </label>
                            </div>
                            <br />
                            <div className='w-[500px] '>
                            <label >
                                <p>Email <sup>*</sup></p>
                                <input type="text" name='Email' placeholder='Enter your Email' className='text-black w-[500px] pl-[20px]' onChange={changeHandler}/>
                            </label>
                            </div>
                            
                            <br />
                            <div className='flex gap-5 '>
                                <label >
                                    <p>Password <sup>*</sup></p>
                                    <input type="text" name='Password' placeholder='Enter your Password' className='text-black pl-[20px]' onChange={changeHandler}/>
                                </label>



                                <label>
                                    <p>Confirm Password <sup>*</sup></p>
                                    <input type="text" name='ConfirmPassword' placeholder=' confirm Password' className='text-black pl-[20px]' onChange={changeHandler}/>
                                </label>
                            </div>
                            
                            <div className='w-[500px] mt-[15px]'>
                                <CTAButton cl={true} txt={"Create Account"} onClick={submitData}></CTAButton>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
            <div className='mr-[120px] h-[450px] w-[450px]'>
                <img src={image} alt="" />
            </div>
        </div>
    )
}

export default SignUp
