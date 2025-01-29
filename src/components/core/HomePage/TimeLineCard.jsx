import React from 'react'

function TimeLineCard(props) {
  return (
    <div className='flex w-[350px] mx-[60px] '>
      <div className='mx-[5px]'>
        <img src={props.logo} alt="" />
      </div>
      <div >
        <div>
        {props.heading}
        </div>
        <div>
        {props.txt}
        </div>
        
      </div>
      
    </div>
  )
}

export default TimeLineCard
