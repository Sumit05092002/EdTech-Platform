import React from 'react'
import data from '../../../data/footer-links'
import logo from '../../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom';
function Footer() {
    const resources = [
        "Articles",
        "Blog",
        "Chart Sheet",
        "Code challenges",
        "Docs",
        "Projects",
        "Videos",
        "Workspaces"
    ];

    return (
        <div className='text-richblack-500 flex bg-richblack-800 '>
            <div className='flex gap-10 w-[1800px] h-[600px] justify-around border-r mt-[80px] mb-[50px]'>
                <div className='flex h-[200px] flex-col justify-around ml-[100px]'>
                    <img src={logo} alt="" />
                        <h1 className='text-white'>Company</h1>
                    <div>
                    <div>About</div>
                    <div>Career</div>
                    <div>Affilates</div>
                    </div>
                </div>
                <div className='flex flex-col h-[300px] justify-around'>
                    
                    <h1 className='mt-[20px] text-white'>Resources</h1>
                    <div >
                        {
                            resources.map((data) => {
                                return <p className='mt-[5px]'>{data}</p>
                            })
                        }
                        <br />
                        <br />
                        <div>
                            <h1>Support</h1>
                            <p>Help Center</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col h-[250px] justify-around mr-[100px]'>
                    <h1 className='mt-[20px] text-white'>Plans</h1>
                    <p className='mt-[20px]'>Paid memberships</p>
                    <p>For students</p>
                    <p>Business solutions</p>
                    <br />
                    <br />
                    <div>
                        <h1 className='text-white'>Community</h1>
                        <p>Forums</p>
                        <p>Chapters</p>
                        <p>Events</p>
                    </div>
                </div>

            </div>
            <div className='flex w-[1800px] justify-around mt-[80px]  mb-[100px]'>
                <div className='flex flex-col mt-[20px]'>
                    <h1 className='mb-[15px] text-white'>{data[0].title}</h1>
                    {
                        data[0].links.map((element) => {
                            return <Link to={`${element.link}`} className='hover:text-white mt-[5px]'>{element.title}</Link>
                        })
                    }
                </div>
                <div className='flex flex-col mt-[20px]'>
                    <h1 className='mb-[15px] text-white'>{data[1].title}</h1>
                    {
                        data[1].links.map((element) => {
                            return <Link to={`${element.link}`} className='hover:text-white mt-[5px]'>{element.title}</Link>
                        })
                    }
                </div>
                <div className='flex flex-col mt-[20px]'>
                    <h1 className='mb-[15px] text-white'>{data[2].title}</h1>
                    {
                        data[2].links.map((element) => {
                            return <Link to={`${element.link}`} className='hover:text-white mt-[5px]'>{element.title}</Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Footer
