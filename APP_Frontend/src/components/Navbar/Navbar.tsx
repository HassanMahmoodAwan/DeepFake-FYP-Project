import React, {useState} from 'react'
import { Button } from "@material-tailwind/react"
import { NavLink } from "react-router-dom"

function Navbar() {
    const [menuToggle, setmenuToggle] = useState(false)
    const [dropDownIcon, setDropDownIcon] = useState(<span>&#9776;</span>)
  return (
    <div className="h-14 w-full sticky top-0 z-10 border-box px-8 xl:px-20 bg-gray-200">
        <div className="h-full w-full flex justify-between items-center">

            {/* Logo */}
            <div id="Logo" className="flex space-x-2">
                <h1 className="text-xl font-bold">DeepCloning</h1>
                <h1 className="px-3 py-0.5 bg-indigo-700 rounded text-white font-bold">AI</h1>
            </div>

            {/* Menu Buttons */}
            <ul className="hidden lg:flex space-x-8  text-base font-bold">
                <NavLink to={"/"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>Home</NavLink>

                <NavLink to={"/textSpeech"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>Text-To-Speech</NavLink>

                <NavLink to={"/voiceCloning"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>VoiceCloning</NavLink>

                <NavLink to={"/aboutUs"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>About Us</NavLink>

                <NavLink to={"/contactUs"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-slate-900'}`}>Contact Us</NavLink>
                
            </ul>

            {/* Login SignUp */}
            <div className="hidden lg:flex space-x-2">
                <NavLink to={"/login"}>
                    <Button variant="outlined" placeholder={''} size="sm">Login</Button>
                </NavLink>
                
                <NavLink to={"/signup"}>
                    <Button variant="filled" placeholder={''} size="sm" className="bg-indigo-800">SignUp</Button>
                </NavLink>
            </div>

            

            {/* Hamburgur Icon */}
            <div className="block lg:hidden relative top-[107px] cursor-pointer text-indigo-800">
               <div className='text-end text-3xl text-indigo-500'
               onClick={()=>{
                setmenuToggle((prev)=>!prev); 
                menuToggle? 
                 setDropDownIcon(<span>&#9776;</span>):setDropDownIcon(<span>&#10539;</span>)}}>
                    {dropDownIcon}
               </div> 

                <div className={` bg-white rounded w-auto flex flex-col items-center relative top-4 px-8 py-4 space-y-3 text-base font-bold ${menuToggle?"visible":"invisible"}`}>
                    <ul className='flex flex-col items-center space-y-1'>
                        <NavLink to={"/"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-gray-900'}`}>Home</NavLink>

                        <NavLink to={"/textSpeech"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-gray-900'}`}>Text-To-Speech</NavLink>

                        <NavLink to={"/voiceCloning"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-gray-900'}`}>VoiceCloning</NavLink>

                        <NavLink to={"/aboutUs"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-gray-900'}`}>About Us</NavLink>

                        <NavLink to={"/contactUs"} className={({isActive})=> `${isActive ? 'text-purple-700': 'text-gray-900'}`}>Contact Us</NavLink>
                    </ul>

                    
                    <div className="flex space-x-2">
                        <NavLink to={"/login"}>
                            <Button variant="outlined" placeholder={''} size="sm">Login</Button>
                         </NavLink>
                
                        <NavLink to={"/signup"}>
                            <Button variant="filled" placeholder={''} size="sm" className="bg-indigo-800">SignUp</Button>
                        </NavLink>
                    </div>
                    
                    
                </div>  
                
            </div>

        </div>
      
    </div>
  )
}

export default Navbar
