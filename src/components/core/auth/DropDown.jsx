import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import {setUser} from '../../../slices/profileSlice'
import {setToken} from '../../../slices/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function DropDown() {
    const { user } = useSelector((state) => state.profile);
    const [open, setOpen] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    

    if (!user) {
        return null;
    }

    const logOutHandler=()=>{
       dispatch(setUser(null));
       dispatch(setToken(null));
       navigate("/");
    }
    return (
        <div className="relative dropdown-container">
            {/* Dropdown Toggle Button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-x-1"
            >
                <img
                    src={user?.userImage}
                    alt="User"
                    className="aspect-square w-[30px] rounded-full object-cover"
                />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute left-0 top-full mt-1 w-[300px] flex flex-col  gap-3 rounded-md bg-richblack-5 shadow-lg p-4 text-richblack-900 z-50">
                    <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <VscDashboard />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                            setOpen(false);
                            console.log("LogOut clicked");
                        }}
                    >
                        <VscSignOut />
                        <span onClick={logOutHandler}>LogOut</span>
                    </div>
                </div>
            )}
        </div>
    );
}
