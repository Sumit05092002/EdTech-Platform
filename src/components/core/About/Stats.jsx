import React from 'react'

function Stats() {
  return (
    <div className='flex w-[1550px] justify-around h-[150px] bg-richblack-700 text-2xl'>
      <div className='flex flex-col justify-center'>
        <div>
            <p  className='text-white font-bold flex justify-center w-[100px] mb-[5px]'>5k</p>
        </div>
        <div className='text-richblack-100 font-bold'>
            Active Students
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <div>
            <p  className='text-white font-bold mb-[5px]'>10+</p>
        </div>
        <div>
            <p className='text-richblack-100 font-bold'>Mentors</p>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <div>
            <p  className='text-white font-bold mb-[5px]'>200+</p>
        </div>
        <div>
            <p className='text-richblack-100 font-bold'>Courses</p>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <div  className='text-white font-bold mb-[5px]'>
            50+
        </div>
        <div className='text-richblack-100 font-bold'>
            Awards
        </div>
      </div>
    </div>
  )
}

export default Stats
