import React from 'react'
import { TypeAnimation } from 'react-type-animation'
const Animation1 = () => {
  return (
    <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] border-richblack-800 border-2 ">
                        <div className="codeblock1 absolute"></div>
                        {/* Indexing */}
                        <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                            <p>5</p>
                            <p>6</p>
                            <p>7</p>
                            <p>8</p>
                            <p>9</p>
                            <p>10</p>
                            <p>11</p>
                        </div>

                        {/* Codes */}
                        <div
                            className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-yellow-25 pr-1 ` }
                        >
                            <TypeAnimation
                                sequence={[`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`, 1000, ""]}
                                cursor={true}
                                repeat={Infinity}
                                style={{
                                    whiteSpace: "pre-line",
                                    display: "block",
                                }}
                                omitDeletionAnimation={true}
                            />
                        </div>
                    </div>
  )
}

export default Animation1
