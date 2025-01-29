import React from 'react'
import data from '../../../data/homepage-explore'
function TagSlider(props) {
  return (
    <div className='flex flex-row w-[800px] rounded-3xl border h-[50px] justify-around mt-[20px] bg-richblack-700'>
      {
        data.map((tag)=>{
            return <button className={`${props.tab===tag.tag?"bg-richblack-900 rounded-3xl px-[25px] py-[5px]":"bg-richblack-700 "} hover:pointer text-richblack-200 font-semibold py-[5px]`} onClick={()=>{props.func(tag.tag)}}>{tag.tag}</button>
        })
      }
    </div>
  )
}

export default TagSlider
