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
                    <source src={"https://replicate.delivery/pbxt/X1OkAOFnMZ4AI9CY2R8lHBpChHmAqlGFrGyAXJvRKfuJptVJA/tmp2drcmhpffile_stereo%20%28Trump%20Ver%29.mp3"} type="audio/mpeg" />
                </audio>
            </div>
        </div>
        {/* === End of Trump === */}

        {/* === Wajahat Qazi === */}
        <div className="w-80 md:w-96 h-auto bg-gray-50 rounded-3xl shadow-md shadow-gray-800 mb-6 mr-2 flex justify-center items-center space-x-4 py-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-gray-300 shadow-md shadow-gray-900 overflow-hidden">
                <img src="/Images/Wajaht_Qazi.jpeg" alt="Wajahat" className=" object-cover w-full h-full" />

            </div>

            <div className="text-black text-start">
                <h1 className="font-bold text-base pl-4">Dr. Wajahat Qazi</h1>
                <audio controls className='w-[200px] h-[40px] md:w-[250px] md:h-[45px]'>
                    <source src={"https://replicate.delivery/pbxt/EtxJ7XdWR6IkFltg7Bv3UkwFlHeYU7fBmjv4e2PtU7m7sjVlA/tmpuw8k00h5file_stereo%20%28wajahat_qazi%20Ver%29.mp3"} type="audio/mpeg" />
                </audio>
            </div>
        </div>
        {/* === End of Wajaht Qazi=== */}

        {/* ===Talha=== */}
        <div className="w-80 md:w-96 h-auto bg-gray-50 rounded-3xl shadow-md shadow-gray-800 mb-6 mr-2 flex justify-center items-center space-x-4 py-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-gray-300 shadow-md shadow-gray-900 overflow-hidden">
                <img src="" alt="" className=" object-cover w-full h-full" />
            </div>

            <div className="text-black text-start">
                <h1 className="font-bold text-base pl-3">M. Talha</h1>
                <audio controls className='w-[200px] h-[40px] md:w-[250px] md:h-[45px]'>
                    <source src="https://replicate.delivery/pbxt/ScKVVNfMsW3hE6SWNfsMFfGjhJmuVDJfp1gWTmuKhfpf822qE/tmp2t4alut1file_stereo%20%28muhammad_talha%20Ver%29.mp3" type="audio/mpeg" />
                </audio>
            </div>
        </div>
        {/* === End of Talha === */}

        {/* ===Wajahat Qazi=== */}
        <div className="w-80 md:w-96 h-auto bg-gray-50 rounded-3xl shadow-md shadow-gray-800 mb-6 mr-2 flex justify-center items-center space-x-4 py-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-gray-300 shadow-md shadow-gray-900 overflow-hidden">
                <img src="/Images/Wajaht_Qazi.jpeg" alt="wajahat" className=" object-cover w-full h-full" />
            </div>

            <div className="text-black text-start">
                <h1 className="font-bold text-base pl-3">Dr. Wajahat TTS</h1>
                <audio controls className='w-[200px] h-[40px] md:w-[250px] md:h-[45px]' >
                    <source src="https://replicate.delivery/pbxt/LEnp4SLAsaYsCxpe9adnU4mSLiwztvaxITGDuQnqUBF3utVJA/tmpo3mbqpvvfile_stereo%20%28wajahat_qazi%20Ver%29.mp3" type="audio/mpeg" />
                </audio>
            </div>
        </div>
        {/* === End of Wajaht Qazi === */}
      </div>
    </div>
    </div>
  )
}

export default SourceVoices
