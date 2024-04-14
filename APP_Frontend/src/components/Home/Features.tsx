import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons"

function Features() {
  return (
    <div className="h-auto w-full  text-center mt-28 mb-14">
        <div className="flex flex-col items-center space-y-3 md:flex-row md:space-x-3 md:space-y-0 ">
            {/* Left Part */}
            <div className="w-full md:w-[50%] h-full box-border text-gray-800 space-y-6 px-2 md:px-12 pt-5 pb-7 bg-red-100 rounded shadow-md shadow-gray-400 bg-opacity-60">
               <h1 className="text-3xl text-black font-bold mb-8 text-center">Traditional Voiceovers</h1>
               <div className='space-y-5'>
                  <div className='flex space-x-4 items-center text-start'>
                    <FontAwesomeIcon icon={faCircleXmark} className='text-2xl text-red-600' />
                    <p className='font-semibold'>Hiring voiceover artist or freelancer.</p>
                  </div>
                  <div className='flex space-x-4 items-center text-start'>
                    <FontAwesomeIcon icon={faCircleXmark} className='text-2xl text-red-600' />
                    <p className='font-semibold'>Average turnaround time: 1 week.</p>
                  </div>
                  <div className='flex space-x-4  items-center text-start'>
                    <FontAwesomeIcon icon={faCircleXmark} className='text-2xl text-red-600' />
                    <p className='font-semibold'>Post editing requires Tech Skills.</p>
                  </div>
                  <div className='flex space-x-4  items-center text-start'>
                    <FontAwesomeIcon icon={faCircleXmark} className='text-2xl text-red-600' />
                    <p className='font-semibold'>Update is Impossible, Need to Record.</p>
                  </div>
               </div>
            </div>
            {/* Right Part */}
            <div className="w-full md:w-[50%] h-full box-border text-gray-800 space-y-6 px-2 md:px-12 pt-5 pb-7 bg-green-100 rounded shadow-md shadow-gray-400 bg-opacity-60">
               <h1 className="text-3xl text-black font-bold mb-8 text-center">AI Voiceovers</h1>
               <div className='space-y-5'>
                  <div className='flex space-x-4 items-center text-start'>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-2xl text-green-600' />
                    <p className='font-semibold'>Simple Web-Based Application.</p>
                  </div>
                  <div className='flex space-x-4 items-center text-start'>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-2xl text-green-600' />
                    <p className='font-semibold'>Average Time to Produce Voiceover 2 mins.</p>
                  </div>
                  <div className='flex space-x-4  items-center text-start'>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-2xl text-green-600' />
                    <p className='font-semibold'>Intuitive Interface, Suitable for Beginners.</p>
                  </div>
                  <div className='flex space-x-4  items-center text-start'>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-2xl text-green-600' />
                    <p className='font-semibold'>Update Content of your voiceovers anytime.</p>
                  </div>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Features
