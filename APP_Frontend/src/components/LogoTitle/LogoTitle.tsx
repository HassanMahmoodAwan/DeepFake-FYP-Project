import React from 'react'
import Logo from "../../assets/Logo.png"

function LogoTitle() {
  return (
    <div id="Logo" className="flex space-x-0 items-center">
        <img src={Logo} alt="Logo" className='w-12 h-12' />
        <h1 className="text-2xl font-bold pr-2">DeepCloning</h1>
        <h1 className="px-3 py-0.5 box-border bg-ttsPurple rounded text-white font-bold">AI</h1>
    </div>
  )
}

export default LogoTitle
