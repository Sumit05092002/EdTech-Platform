import React from 'react'
import { Link } from 'react-router-dom'
const CTAButton = (props) => {
  return (
    <div>
      {
        props.cl?(
            <div className='bg-yellow-100 text-black mx-[5px] my-[5px]  h-[50px] flex justify-center items-center rounded-xl hover:scale-95 px-[10px] py-auto'>
                <Link to={props.lnk}><button onClick={props.onClick}>{props.txt}</button></Link>
            </div>
        ):(
            <div className='bg-richblack-500 mx-[7px] my-[7px] w-[120px] h-[50px] flex justify-center items-center rounded-xl px-[10px] py-[10px] hover:scale-95 '>
                <Link to={props.lnk} ><button onClick={props.onClick}>{props.txt}</button></Link>
            </div>
        )
      }
    </div>
  )
}

export default CTAButton
