import React from 'react'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import Animation1 from '../components/core/HomePage/Animation1'
import Animation2 from '../components/core/HomePage/Animation2'
import CodeBlock from '../components/core/HomePage/CodeBlock'
import CTAButton from '../components/core/HomePage/CTAButton'
import banner from '../assets/Images/banner.mp4'
import Goals from '../components/core/HomePage/Goals'
import knowyourprogress from '../assets/Images/Know_your_progress.png'
import compare from '../assets/Images/Compare_with_others.png'
import plan from '../assets/Images/Plan_your_lessons.png'
import instructor from '../assets/Images/Instructor.png'
import Explore from '../components/core/HomePage/Explore'
import Footer from '../components/core/HomePage/Footer'


const Home = () => {
    return (
        <div className='my-[50px]'>
            <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between '>
                {/*section1*/}


                <Link to="/signUp">
                    <div className='rounded-full mx-auto bg-richblack-400 font-bold w-[250px] h-[50px] my-auto flex justify-center items-center hover:scale-95'>
                        <div className='rounded-full mx-auto px-auto '>
                            <p>Become an Instructor</p>
                        </div>
                    </div>
                </Link>

                <div className=' my-[30px] font-semibold text-4xl flex justify-around'>
                    Empower your future with
                    <HighlightText txt={"coding skills"} />
                </div>
                <div className='w-[1170px] text-xl  flex flex-col items-center text-richblack-400 font-semibold'>
                    <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of
                    </p>
                    <p>resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                </div>
                <div className='flex flex-row mt-8 gap-7'>
                    <CTAButton txt={"Learn More"} cl={true} lnk={"/signUp"}></CTAButton>
                    <CTAButton txt={"Book a Demo"} cl={false} lnk={"/signUp"}></CTAButton>
                </div>

                <div>
                    <video autoPlay loop muted className=" shadow-blue-200 w-[1200px] mt-8" src={banner}></video>
                </div>


                <div className='flex flex-row w-[1500px]  justify-around mt-8'>

                    <CodeBlock heading={<div className="text-4xl font-semibold w-[600px]">
                        Unlock your
                        <HighlightText txt={"coding potential"} /> with our online
                        courses.
                    </div>} body={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} txt={"Try it yourself"} cl={true} tx={"Learn More"} c={false} lnk={"/signUp"} lk={"/signUp"}></CodeBlock>

                    <Animation1></Animation1>


                </div>


                <div className='flex flex-row-reverse w-[1500px] justify-around mt-[120px]'>
                    <CodeBlock heading={<div>start <HighlightText txt={"coding in seconds"} /></div>} body={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} txt={"Continue Lesson"} cl={true} tx={"Learn More"} c={false} lnk={"/signUp"} lk={"/signUp"}></CodeBlock>


                    <Animation2></Animation2>
                </div>
                <div className='mt-[100px]'>
                    <Explore></Explore>
                </div>
            </div>
            <br />
            <br />
            <div className='relative mx-auto flex flex-col w-screen items-center text-rich-black-700 justify-between bg-pure-greys-5 '>
                {/*section2*/}
                <div className='homepage_img  flex h-[333px] gap-7 w-screen justify-center items-end '>
                    <div className='pb-20 flex '>
                    <CTAButton cl={true} txt={"Explore full catalog"} lnk={"/signUp"}></CTAButton>
                    <CTAButton cl={false} txt={"Learn More"} lnk={"/signUp"}></CTAButton>
                    </div>
                    
                </div>
                <br />
                <br />
                <div className='flex w-screen justify-around'>
                    <div className='w-[40%]'>
                        <p className='text-4xl font-bold'>Get the skills you need for a <HighlightText txt={" a job that is in demand."}></HighlightText></p>
                    </div>
                    <div className='w-[30%] flex flex-col h-[200px] justify-around'>
                        <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <div className='w-[150px]'>
                        <CTAButton cl={true} txt={"Learn More"} lnk={"/signUp"}></CTAButton>
                        </div>
                    </div>
                </div>
                <div className='my-[200px]'>
                    <Goals></Goals>
                </div>
                
                <div className='text-4xl font-bold my-[10px]'>
                    <h1>Your swiss knife for <HighlightText txt={"learning any language"}></HighlightText> </h1>
                </div>
                <div className='flex w-[800px] flex-col items-center font-semi-bold'>
                    <p>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking,</p>
                    <p>custom schedule and more.</p>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-center'>
                    <img src={knowyourprogress} alt="" className='object-contain lg:-mr-32'/>
                    <img src={compare} alt="" className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"/>
                    <img src={plan} alt=""  className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"/>
                </div>
                <div className='mt-5'>
                    <CTAButton cl={true} txt={"Learn More"} lnk={"/signUp"}></CTAButton>
                </div>
            </div>
                <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between '>
                <div className='flex flex-row gap-32 pt-20'>

                    <div>
                        <img src={instructor} alt="" />
                    </div>
                    <div className=' flex flex-col items-start width-[50px]  justify-center'>
                        <h1 className='w-[200px] text-4xl mb-10'>Become an <HighlightText txt={"Instructor"}></HighlightText></h1>
                        <p className='mb-10 w-[500px] font-semi-bold text-pure-greys-200'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                        <CTAButton cl={true} txt={"Start Teaching Today "} lnk={"/signUp"}></CTAButton>
                    </div>
                </div>
                </div>
                <br />
                <br />
                <Footer></Footer>
        </div>
    )
}

export default Home
