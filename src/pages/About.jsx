import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import bannerImage1 from '../assets/Images/aboutus1.webp'
import bannerImage2 from '../assets/Images/aboutus2.webp'
import bannerImage3 from '../assets/Images/aboutus3.webp'
import TextCard from '../components/core/About/TextCard'
import foundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/About/Stats'
import CTAButton from '../components/core/HomePage/CTAButton'
function About() {
    return (
        <div className='flex flex-col min-h-screen min-w-full items-center'>
            <div className='flex flex-col items-center border-b-2 border-richblack-500  bg-richblack-700 min-w-full'>
                <div className='mt-[50px]'>
                    <h1 className='text-richblack-5 text-3xl font-bold'>Driving Innovation in Online Education for a</h1>
                    <h1 className='flex justify-center text-3xl font-bold'><HighlightText txt={"Brighter Future"}></HighlightText></h1>
                </div>
                <div className='text-lg text-richblack-300 w-[850px] flex flex-col items-center mt-[10px]'>
                    <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant </p>
                    <p>learning community.</p>
                </div>
                <div className='flex justify-around w-[1300px] mt-[80px]'>
                    <img src={bannerImage1} alt="" />
                    <img src={bannerImage2} alt="" />
                    <img src={bannerImage3} alt="" />
                </div>
                <div className='mt-[80px] flex w-[1200px] flex-col items-center mb-[50px]'>
                    <h1 className='text-3xl font-bold w-[1000px] text-white flex flex-col items-center'>We are passionate about revolutionizing the way we learn. Our </h1>
                    <h1 className='text-3xl font-bold w-[1200px] text-white'>innovative platform <HighlightText txt={" combines technology,"}></HighlightText> <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>expertise</span>, and community to </h1>
                    <h1 className='text-3xl font-bold w-[1000px] text-white flex justify-center'>create an  <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold ml-[10px]'>unparalleled educational experience</span> .</h1>
                </div>
            </div>
                <div className='flex w-[1500px] justify-around mt-[50px] mb-[100px]'>
                    <TextCard heading={"Our Founding Story"} para1={"Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world."} para2={"As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential."} style={"bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] "}></TextCard>
                    <img src={foundingStory} alt="" srcset="" />
                </div>
                <br />
                <br />
                <div className='flex w-[1500px] justify-around mt-[200px]'>
                    <TextCard heading={"Our Vision"} para1={"With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience."} style={"bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold"}></TextCard>
                    <TextCard heading={"Our Mission"} para1={"Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities."} style={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold mx-[5px]"}></TextCard>
                </div>
                <div>
                    <Stats></Stats>
                </div>
                <div className='flex w-[1400px] justify-start'>

                <div className='flex flex-col items-center text-white justify-around h-[300px] w-[400px] mt-[30px] '>
                    <h1 className='text-3xl font-bold'>World-Class Learning for Anyone, Anywhere</h1>
                    <p className='text-lg text-richblack-500'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                    <div className='w-[400px] flex justify-start '>
                    <CTAButton cl={true} txt={"Learn More"} lnk={"/"}></CTAButton>
                    </div>
                    
                </div>
                </div>
                <div className='flex flex-col h-[400px] items-center text-white'>
                    <h1>Get in Touch</h1>
                    <p>We d love to hear from you,please fill out this form</p>
                    <div>
                        
                    </div>
                </div>
        </div>
    )
}

export default About
