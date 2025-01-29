import React, { useEffect } from 'react'
import { useState } from 'react'
import ExploreCard from './ExploreCard';
import exploreData from '../../../data/homepage-explore'
import TagSlider from './TagSlider';
import HighlightText from './HighlightText';
function Explore() {
    const[tag,setTag]=useState("Free");
    const render=exploreData.find((data)=>{return data.tag===tag})
    const[currentCard,setCurrentCard]=useState(exploreData[0].courses[0].heading);
    useEffect(()=>{
        console.log(currentCard)
    })
  return (
    <div className='w-[1500px]  flex flex-col items-center h-[500px] justify-around'>
      <div className='text-4xl'>
        <h1>Unlock the <HighlightText txt={"Power of Code"}></HighlightText></h1>
      </div>
      <div className='text-xl text-pure-greys-300 font-semibold mt-[10px]'>
        <p>Learn to Build Anything You Can Imagine</p>
      </div>
      <div>
        <TagSlider func={setTag} tab={tag}></TagSlider>
      </div>
      
      <div className='flex flex-row gap-5 w-[1200px] justify-around'>
        {
            render.courses.map((data)=>{
                return <ExploreCard title={data.heading} desc={data.description} level={data.level} no={data.lessionNumber} func={setCurrentCard} currentCard={currentCard}></ExploreCard>
            })
        }
      </div>

    </div>
  )
}

export default Explore
