import React, {useState, useEffect} from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { Button } from '@material-tailwind/react'
import HeroSection_DF from "../../assets/HeroSection_DF.png"

const Hero: React.FC = ()=> {
  return (
    <div className='h-[340px] w-full flex mb-4 md:mb-0'>
      {/* Left-Side */}
      <div className='lg:w-[50%] h-full w-full text-center lg:text-start'>
        <p className='text-sm mb-3'>DEEP FAKE AI VOICE GENERATOR</p>
        <h1 className='text-4xl font-bold'>The most Realistic DeepFake Voice Generator using <br/>AI</h1>
        <h1 className='text-4xl font-bold text-indigo-800'>
          
          <Typewriter 
          cursor={true} 
          cursorBlinking={true}
          cursorColor={"black"}
          delaySpeed={1500}
          deleteSpeed={100}
          typeSpeed={100}
          words={["Text to Speech", "Voice Cloning"]}
          loop={0} />
        </h1>

        <p className='text-sm mt-4 md:mt-10 mb-2 md:mb-4'>Multiple Voices Available for cloning in English & Urdu.</p>
        
        <Button variant='filled' className='rounded-full bg-indigo-800' placeholder="">Get Started Now!</Button>
      </div>

      {/* Right SIde */}
      <div className='w-[50%] h-full hidden lg:block'>
        <img src={HeroSection_DF} alt="Hero Section Img" className='w-[500px] h-[400px] float-right relative bottom-14 z-0' />
      </div>
    </div>
  )
}

export default Hero
