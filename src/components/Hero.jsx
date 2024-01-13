import React from 'react'
import {logo} from '../assets';

const Hero = () => {
  return (
    <header className='flex w-full justify-center items-center flex-col'>

    <nav className='flex items-center justify-between w-full mb-10 p-2'>
      <img src={logo} alt="Logo" className='w-12 object-contain rounded-[10px]'/>

      <button type='button' onClick={()=>{window.open('https://github.com/darkelf2402/quick_read/tree/master')} } className='black_btn'>
        Github
      </button>
    </nav>


    <h1 className='head_text'>
    Summarize Articles <br className='max-md:hidden'/> 
    <span className='blue_gradient'>for free using AI</span>
    </h1>

    <h2 className='desc'>
      Simplify and obtain descriptions of long articles in seconds using this opensource tool.
    </h2>

    </header>
  )
}

export default Hero