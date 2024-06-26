import RouterLayout from "./RouterLayout"

import './App.css'
// import { Footer, Navbar } from "./components"
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import { AboutUs, ContactUs, Home, TextSpeech, VoiceCloning, Login, SignUp, Test, Admin } from "./components"

function App() {
  const route = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RouterLayout />}>
      <Route path="" element={<Home />} />
      <Route path="textSpeech" element={<TextSpeech />} />
      <Route path="voiceCloning" element={<VoiceCloning />} />
      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="contactUs" element={<ContactUs />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />}/>
      <Route path="Test" element={<Test/>}/>
      <Route path="admin" element={<Admin />} />
    </Route>
  ))

  return (
    <div className="h-full w-full bg-gray-100">
      
        <RouterProvider router={route} />
      
    </div>
  )
}

export default App
