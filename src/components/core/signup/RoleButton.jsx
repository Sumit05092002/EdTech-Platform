import React from 'react'

function RoleButton(props) {
    const role=["Student","Instructor"];
  return (
    <div>
      {
        role.map((data)=>{
            return <button className={`${props.active===data?"bg-richblack-800 rounded-2xl px-[5px] h-[50px]":"bg-richblack-700 px-[5px] h-[50px]"}`} onClick={()=>{props.setActive(data)}}>{data}</button>
        })
      }
    </div>
  )
}

export default RoleButton
