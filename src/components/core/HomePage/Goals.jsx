import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLineCard from './TimeLineCard'
import TimeLine from '../../../assets/Images/TimelineImage.png'
function Goals(props) {
    const timeLine = [
        {
            logo: Logo1,
            heading: "Leadership",
            desc: "Fully commited to success of the company"
        },
        {
            logo: Logo2,
            heading: "Responsibilty",
            desc: "Students will be our top priority"
        },
        {
            logo: Logo3,
            heading: "Flexibility",
            desc: "The ability to switch is an important skills"
        },
        {
            logo: Logo4,
            heading: "Solve the problem",
            desc: "Code your way to a solution"
        }
    ]
    return (
        <div className='flex flex-row gap-5 w-[1400px] justify-around '>
            <div className='flex flex-col justify-around h-[500px] w-[50%]  items-center  '>
                {
                    timeLine.map((data) => {
                        return <TimeLineCard logo={data.logo} heading={data.heading} txt={data.desc}></TimeLineCard>
                    })
                }
            </div>
            <div className='w-[50%] flex justify-start relative'>
                
                <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 mx-[50px]">
                    <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                        <h1 className="text-3xl font-bold w-[75px]">10</h1>
                        <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                            Years experiences
                        </h1>
                    </div>

                    {/* Section 2 */}
                    <div className="flex gap-5 items-center lg:px-14 px-7">
                        <h1 className="text-3xl font-bold w-[75px]">250</h1>
                        <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                            types of courses
                        </h1>
                    </div>
                </div>
                <img src={TimeLine} alt="" />
            </div>
        </div>
    )
}

export default Goals
