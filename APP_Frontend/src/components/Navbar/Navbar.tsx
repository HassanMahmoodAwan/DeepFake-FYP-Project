import React, {useEffect, useState} from 'react'
import { Button } from "@material-tailwind/react"
import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogoTitle from '../LogoTitle/LogoTitle'

function Navbar() {
    const [menuToggle, setmenuToggle] = useState(false)
    const [dropDownIcon, setDropDownIcon] = useState(<span>&#9776;</span>)
    const [name, setName] = useState("");
    const token = sessionStorage.getItem('token');
    const received = JSON.parse(token);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            if (received && received.token) { 
                fetch(`http://localhost:3333/users/single`, {
                    headers: {
                        Authorization: `Bearer ${received.token}`
                    }
                })
                .then((response) => {  
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    return response.json();
                })
                .then((userData) => {
                    setName(userData.name);
                })
                .catch((error) => {
                    console.error("Error fetching user details:", error);
                });
            }
        }
    }, []);

    const handleTextToSpeechClick = () => {
        if (!received || !received.token) { 
            window.location.href = "/login";
        }
    };

    const handleVoiceCloningClick = () => {
        if (!received || !received.token) {
            window.location.href = "/login";
        } 
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setName("");
        navigate("/login");
    };

  return (
    <div className="h-14 w-full sticky top-0 z-10 border-box px-8 xl:px-20 bg-gray-200">
        <div className="h-full w-full flex justify-between items-center">

            {/* Logo */}
            <LogoTitle />
            {/* ====== */}

            {/* Menu Buttons */}
            <ul className="hidden lg:flex space-x-8  text-base font-bold">
                <NavLink to={"/"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-slate-900'}`}>Home</NavLink>

                <NavLink to={"/admin"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-slate-900'}`}>Admin</NavLink>

                <NavLink to={"/textSpeech"}  onClick={handleTextToSpeechClick} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-slate-900'}`}>Text-To-Speech</NavLink>

                <NavLink to={"/voiceCloning"} onClick={handleVoiceCloningClick} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-slate-900'}`}>VoiceCloning</NavLink>

                {/* <NavLink to={"/aboutUs"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-slate-900'}`}>About Us</NavLink> */}

                <NavLink to={"/contactUs"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-slate-900'}`}>Contact Us</NavLink>


                
            </ul>

            {/* Login SignUp */}
            {name ? (
                    <div className="hidden lg:flex space-x-2">
                        {/* <FontAwesomeIcon  className='mt-1 mr-1 text-xl' icon="user" /> */}
                        <img src="/images/UserLogo.jpg" alt="UserLogo" className='w-24 h-24'/>
                        <p className='text-xl text-ttsPurple font-bold'
                        onClick={handleLogout}>{name}</p>
                    </div>
                ) : (
                    <div className="hidden lg:flex space-x-2">
                        <NavLink to={"/login"}>
                            <Button variant="outlined" placeholder={''} size="sm">Login</Button>
                        </NavLink>
                        <NavLink to={"/signup"}>
                            <Button variant="filled" placeholder={''} size="sm" className="bg-ttsPurple">SignUp</Button>
                        </NavLink>
                    </div>
                )}

            

            {/* Hamburgur Icon */}
            <div className="block lg:hidden relative top-[117px] cursor-pointer text-ttsPurple
                            ">
               <div className='text-end text-3xl text-ttsPurple'
               onClick={()=>{
                setmenuToggle((prev)=>!prev); 
                menuToggle? 
                 setDropDownIcon(<span>&#9776;</span>):setDropDownIcon(<span className='text-4xl'>&#10539;</span>)}}>
                    {dropDownIcon}
               </div> 

                <div className={` bg-white rounded w-auto flex flex-col items-center relative top-4 px-8 py-4 space-y-3 text-base font-bold ${menuToggle?"visible":"invisible"} shadow-md`}>
                    <ul className='flex flex-col items-Start space-y-2'>
                        <NavLink to={"/"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-gray-900'}`}>Home</NavLink>

                        <NavLink to={"/textSpeech"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-gray-900'}`}>Text-To-Speech</NavLink>

                        <NavLink to={"/voiceCloning"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-gray-900'}`}>VoiceCloning</NavLink>

                        <NavLink to={"/aboutUs"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-gray-900'}`}>About Us</NavLink>

                        <NavLink to={"/contactUs"} className={({isActive})=> `${isActive ? 'text-indigo-800 border-b-2 border-ttsPurple': 'text-gray-900'}`}>Contact Us</NavLink>
                    </ul>

                    
                    <div className="flex space-x-2">
                        <NavLink to={"/login"}>
                            <Button variant="outlined" placeholder={''} size="sm">Login</Button>
                         </NavLink>
                
                        <NavLink to={"/signup"}>
                            <Button variant="filled" placeholder={''} size="sm" className="bg-ttsPurple">SignUp</Button>
                        </NavLink>
                    </div>
                    
                    
                </div>  
                
            </div>

        </div>
      
    </div>
  )
}

export default Navbar
