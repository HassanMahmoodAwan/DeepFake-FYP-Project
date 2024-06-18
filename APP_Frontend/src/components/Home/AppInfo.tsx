// import React from 'react'

function AppInfo() {
  return (
    <div className="h-auto w-full  text-center md:my-10">
        <h1 className="text-3xl font-bold mb-8">How Deep Fake Voice Cloning Works?</h1>
        <div className="flex flex-col items-center space-y-3 md:flex-row md:space-x-3 md:space-y-0 ">
            {/* Left Part */}
            <div className="w-full md:w-[50%] h-full box-border text-gray-800 space-y-6 p-5 bg-white rounded shadow-sm shadow-indigo-800">
               <p > <span className="text-ttsPurple">AI voice cloning</span>, is a technology that uses machine learning to simulate a specific person’s voice. This technology requires a certain amount of voice data to analyze and learn the unique vocal characteristics of the individual. Once trained, it can generate speech that sounds very similar to the original voice. <br /> <br />
               One voice cloning application is Google’s Tacotron system. It can generate highly realistic speech in a range of voices. Other applications includes Speechify, RVC and e.t.c

              </p>
            
            </div>
            {/* Right Part */}
            <div className="w-full md:w-[50%] h-full box-border text-gray-800 space-y-6 p-5 bg-white rounded shadow-sm shadow-indigo-800">
               <p >It brings <span className="text-ttsPurple">generative AI</span>, TTS, and human voice cloning to the masses. It’s worth noting that while voice cloning technology has many positive applications like saving the lovedOne voices and can help as an Assitant to professors and other professionals.
                <br /> <br />

                 It also raises ethical and legal issues related to consent, identity theft, and the potential for misuse in spreading misinformation or deception, such as in deepfake audio. As a result, it’s an area that requires careful regulation and oversight.</p>
            
            </div>
        </div>
    </div>
  )
}

export default AppInfo
