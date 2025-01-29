import React from 'react'

function ExploreCard(props) {
  return (
    <div className={`flex flex-col h-[300px] justify-around w-[300px] hover:cursor-pointer ${props.currentCard===props.title?"bg-white text-black shadow-yellow-50 shadow-[12px_12px_0_0] mt-[80px]":"bg-richblack-700 text-white mt-[80px]"} `} onClick={()=>{props.func(props.title)}}>
      <div className='mx-[20px]'>
        <h1>{props.title}</h1>
      </div>
      <div className='w-[300px] mx-[10px]'>
        <p>{props.desc}</p>
      </div>
      <div className='flex flex-row justify-between w-[250px] mx-[20px]'>
        <button>{props.level}</button>
        <button>{props.no} Lessons</button>
      </div>
    </div>
  )
}

export default ExploreCard
