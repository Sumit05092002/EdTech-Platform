import React from 'react'
import CTAButton from './CTAButton'
const CodeBlock = (props) => {
  return (
    <div className='w-[600px] flex flex-col align-center'>
      <div className=' my-[30px] font-semibold text-4xl  w-[900px]'>
        {props.heading}
      </div>
      <div className='w-[500px]'>
        {props.body}
      </div>
      <div className='flex flex-row gap-7 mt-8'>
        <CTAButton txt={props.txt} cl={props.cl} lnk={props.lnk}></CTAButton>
        <CTAButton txt={props.tx} cl={props.c} lnk={props.lk}></CTAButton>
      </div>
    </div>
  )
}

export default CodeBlock
