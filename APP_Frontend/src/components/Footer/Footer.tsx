// import React from 'react'
import { IconButton } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <div className="h-[270px] w-full relative bottom-0 border-[1px] border-t-blue-gray-600">
        <div className="h-[255px] w-full">
            <div className="h-[210px] w-full lg:px-20 block lg:flex">
                {/* Left-Part */}
                <div className="w-full lg:w-[50%] h-[50%] lg:h-full  grid place-content-center lg:space-y-3">
                    <div id="Logo-Footer" className="flex space-x-2 mb-2 justify-center lg:justify-start">
                        <h1 className="text-xl font-bold">Deep Cloning</h1>
                        <h1 className="px-3 py-0.5 bg-indigo-700 rounded text-white font-bold">AI</h1>
                    </div>

                    <p className="lg:w-[350px] text-base text-center lg:text-start">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ut expedita quia </p>
                    
                    {/* Social Media Icons */}
                    <div className="hidden lg:flex space-x-3">
                        
                        <FontAwesomeIcon icon={faGithub} className="text-2xl text-gray-900 cursor-pointer" />
                        <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-blue-700 cursor-pointer" />
                        <FontAwesomeIcon icon={faGoogle} className="text-2xl text-red-800 cursor-pointer" />
                        <FontAwesomeIcon icon={faTwitter} className="text-2xl text-blue-900 cursor-pointer" />
                        
                    </div>
                </div>

                {/* Right Part */}
                <div className="w-full lg:w-[50%] h-[50%] lg:h-full box-border overflow-hidden">
                    
                    <div className="w-full h-full grid lg:place-content-center text-center lg:text-start">
                        
                        <div className="space-y-2 lg:space-y-3">
                            <h1 className="text-xl font-bold">Our Company</h1>
                            <ul className="space-x-2 md:space-x-4
                             lg:space-x-0 lg:space-y-1 flex lg:grid justify-center">
                                <NavLink to={"/"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>Home</NavLink>

                                <NavLink to={"textSpeech"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>Text-To-Speech</NavLink>

                                <NavLink to={"voiceCloning"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>VoiceCloning</NavLink>

                                <NavLink to={"aboutUs"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>About</NavLink>

                                <NavLink to={"contactUs"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>Contact</NavLink>
                            </ul>



                        {/* Social Media Icons */}
                        <div className="flex lg:hidden justify-center space-x-3">
                            <FontAwesomeIcon icon={faGithub} className="text-xl text-gray-900 cursor-pointer" />
                            <FontAwesomeIcon icon={faLinkedin} className="text-xl text-blue-700 cursor-pointer" />
                            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-800 cursor-pointer" />
                            <FontAwesomeIcon icon={faTwitter} className="text-xl text-blue-900 cursor-pointer" />
                            
                        </div>

                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex lg:block items-center justify-center w-full h-[45px] text-center text-base font-bold">CopyRights @ Deep Cloning.AI</div>
        </div>
        
        
        {/* Bottom Line */}
        <div className="h-[15px] relative bottom-0 w-full bg-indigo-900"></div>

    </div>
      
  )
}

export default Footer
