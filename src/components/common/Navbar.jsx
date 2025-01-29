import React, { useEffect } from 'react'
import data from '../../data/navbar-links'
import { Link,NavLink } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import CTAButton from '../core/HomePage/CTAButton'
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from 'react-redux'
import DropDown from '../core/auth/DropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
export default function Navbar() {
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {itemCount}=useSelector((state)=>state.cart);
    const [sublink,setsublink]=useState([]);
    const getCategory=async()=>{
        const result=await apiConnector("GET",categories.CATEGORIES_API);
        setsublink(result.data.data);
        console.log(sublink);
    }

    useEffect(()=>{
        getCategory();
    },[])
  return (
    <div className='flex justify-center border-b-2 border-richblack-700'>
      <nav className='flex w-9/12 h-[50px] justify-around items-center my-[10px] '>
        <div>
            <NavLink to={"/"}><img src={logo} alt="" srcset="" className='h-[35px]'/></NavLink>
        </div>
        <div>
        <ul  className='text-white w-[350px] flex  justify-around'>
            {
              data.map((data)=>{
                {
                    return data.title==="Catalog"?(<div className='relative flex items-center group cursor-pointer'>
                        <p>{data.title}</p>
                        <MdOutlineArrowDropDown />
                        <div className='absolute left-0 top-full mt-1 w-[300px] flex flex-col rounded-md bg-richblack-5 shadow-lg p-4 text-richblack-900 opacity-0 invisible scale-90 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:scale-100 z-50'>
                            {
                                sublink.map((data)=>{
                                    return <Link to={"/catalogPage"}><p className='hover:bg-richblack-50 rounded-lg p-[10px]'>{data.name}</p></Link>
                                })
                            }
                        </div>
                    </div>):(<NavLink to={data?.path}>
                        {data.title}
                    </NavLink>)
                }
              })  
            }
        </ul>
        </div>
        <div className='flex mx-[20px] gap-8 items-center'>
            {
               user&&user?.accountType!=="Instructor"&&(
                    <Link to={"/dashboard/cart"} className='relative'>
                    <IoCartOutline  className='w-[50px] h-[50px] rounded-full bg-richblack-300' />
                    {
                        itemCount>0&&(
                            <span>
                                {itemCount}
                            </span>
                        )
                    }
                    </Link>
                )
            }
            {
                token===null&&(
                    <CTAButton cl={false} lnk={"/login"} txt={"Log In"}></CTAButton>
                )
            }
            {
                token===null&&(
                    <CTAButton cl={false} lnk={"/signUp"} txt={"Sign Up"}></CTAButton>
                )
            }
            {
                token!==null&&<DropDown></DropDown>
            }
        </div>
      </nav>
    </div>
  )
}
