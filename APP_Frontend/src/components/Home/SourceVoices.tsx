// import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

function SourceVoices() {
  return (
    <div className="w-full h-[600px] md:h-[350px] bg-indigo-900 flex items-center rounded-xl shadow-lg shadow-indigo-400 box-border">
    <div className="w-full rounded-lg text-center text-gray-100 box-border">
      <h1 className="text-3xl font-bold pt-4">Voices Available for Cloning</h1>
      <p className="text-gray-400 text-lg">Voice sample of <b>5</b> seconds.</p>

      <div className="w-full h-50 flex flex-wrap justify-around items-center px-0 md:px-8 pt-8">
        {/* ===TRUMP=== */}
        <div className="w-80 md:w-96 h-auto bg-gray-200 rounded-3xl shadow-md shadow-gray-800 mb-6 mr-2 flex justify-center items-center space-x-4 py-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-gray-300 shadow-md shadow-gray-900 overflow-hidden">
                <img src="/Images/TrumpPhoto.jpg" alt="Trump" className=" object-cover w-full h-full" />
            </div>

            <div className="text-black text-start">
                <h1 className="font-bold text-base pl-4">D.Trump</h1>
                <audio controls className='w-[200px] h-[40px] md:w-[250px] md:h-[45px]'>
                    <source src="" type="audio/mpeg" />
                </audio>
            </div>
        </div>
        {/* === End of Trump === */}

        {/* === Imran Khan === */}
        <div className="w-80 md:w-96 h-auto bg-gray-50 rounded-3xl shadow-md shadow-gray-800 mb-6 mr-2 flex justify-center items-center space-x-4 py-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-gray-300 shadow-md shadow-gray-900 overflow-hidden">
                <img src="/Images/ImranKhans.jpg" alt="Trump" className=" object-cover w-full h-full" />
            </div>

            <div className="text-black text-start">
                <h1 className="font-bold text-base pl-4">Imran Khan</h1>
                <audio controls className='w-[200px] h-[40px] md:w-[250px] md:h-[45px]'>
                    <source src="" type="audio/mpeg" />
                </audio>
            </div>
        </div>
        {/* === End of Imran Khan=== */}

        {/* ===TRUMP=== */}
        <div className="w-80 md:w-96 h-auto bg-gray-50 rounded-3xl shadow-md shadow-gray-800 mb-6 mr-2 flex justify-center items-center space-x-4 py-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-gray-300 shadow-md shadow-gray-900 overflow-hidden">
                <img src="/Images/TrumpPhoto.jpg" alt="Trump" className=" object-cover w-full h-full" />
            </div>

            <div className="text-black text-start">
                <h1 className="font-bold text-base pl-3">D.Trump</h1>
                <audio controls className='w-[200px] h-[40px] md:w-[250px] md:h-[45px]'>
                    <source src="" type="audio/mpeg" />
                </audio>
            </div>
        </div>
        {/* === End of Trump === */}

        {/* ===TRUMP=== */}
        <div className="w-80 md:w-96 h-auto bg-gray-50 rounded-3xl shadow-md shadow-gray-800 mb-6 mr-2 flex justify-center items-center space-x-4 py-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-gray-300 shadow-md shadow-gray-900 overflow-hidden">
                <img src="/Images/TrumpPhoto.jpg" alt="Trump" className=" object-cover w-full h-full" />
            </div>

            <div className="text-black text-start">
                <h1 className="font-bold text-base pl-3">D.Trump</h1>
                <audio controls className='w-[200px] h-[40px] md:w-[250px] md:h-[45px]' >
                    <source src="" type="audio/mpeg" />
                </audio>
            </div>
        </div>
        {/* === End of Trump === */}
      </div>
    </div>
    </div>
  )
}

export default SourceVoices
