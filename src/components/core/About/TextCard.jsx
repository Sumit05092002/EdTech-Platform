import React from 'react'

function TextCard(props) {
  return (
    <div className='flex flex-col h-[300px] w-[500px] justify-between'>
      <div>
        <h1 className={`font-bold text-3xl ${props.style}`}>{props.heading}</h1>
      </div>
      <br />
      <br />
      <div>
        <p className='text-lg text-richblack-500'>{props.para1}</p>
      </div>
      <br />
      <br />
      <div>
        <p className='text-lg text-richblack-500'>{props.para2}</p>
      </div>
    </div>
  )
}

export default TextCard
