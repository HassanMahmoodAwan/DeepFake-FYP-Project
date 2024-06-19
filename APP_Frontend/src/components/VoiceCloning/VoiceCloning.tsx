import React, {useState, useEffect, useRef} from 'react'
import {Select, Option, Alert, Button, Spinner} from "@material-tailwind/react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFolderOpen, faMagicWandSparkles, faMicrophone } from '@fortawesome/free-solid-svg-icons'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function VoiceCloning() {
  const [filename, setFilename] = React.useState("No file uploaded")
  const [inputFile, setInputFile] = useState(null)
  const [uploadFile, setUploadFile] = useState(null)
  const [option, setOption] = useState<string>("Trump")

  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState(null)

  
  const [Output, setOutput] = useState<JSX.Element | string>("No Generated Ouptut!")
  const [showInput, setShowInput] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [loading, setLoading] = useState(false)


  const [rec_blob, setBlob] = useState(null)
  const [rec_fileName, setRecFileName] = useState<any>('')
  const [is_recFile, setIs_RecFile] = useState(false)


  const chunksRef = useRef([])
  const timerRef = useRef(null)

  const [isOutputGen, setIsOutputGen] = useState<boolean>(false)
  const [genTime, setGenTime] = useState<null | number | string>(null)
  let startTime:number;
  let endTime:number;



  // ===== File Upload and Handling File
  async function useFileChange(e){
    setInputFile(null);
    setIsOutputGen(false);
    setIs_RecFile(false);


    const file = e.target.files[0]
    // const url = URL.createObjectURL(file);
    // setUrl(URL.createObjectURL(file))

    if (file){
      const url = URL.createObjectURL(file);
      setUploadFile(file);
      setFilename(file.name);
      
      setInputFile( <audio controls>
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio> );

      console.log(inputFile)


    }else{
      setFilename("No file Chooses")
    }
  }

  // ====== REcording Audio =========== 
   const startRecording = async () => {
    setIsOutputGen(false)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/mp3' })
        const url = URL.createObjectURL(blob);
        const fileDate = Date.now()
        setBlob(blob)
        setRecFileName(fileDate)
        setIs_RecFile(true)
        setUploadFile(fileDate)

        setInputFile(
            <audio controls>
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>  
        )

        chunksRef.current = []
      }
      
      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)

      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000)

    } catch (error) {
      console.error('Error accessing the microphone:', error);
      toast.error("Error Accessing MicroPhone", {autoClose:2000})
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setIsRecording(false)
      clearInterval(timerRef.current)
      setRecordingTime(0)
      setInputFile(null)
    }
  }



  // ============ OUTPUT ===========
  async function generateOutput(){
    setIsOutputGen(false)
    try {
      const formData = new FormData();

      if (is_recFile){
        formData.append('file', rec_blob, `Voice_${rec_fileName}.mp3` );
        // setIs_RecFile(false)
      }else {
        if (uploadFile){
          formData.append('file', uploadFile)
        }else {
          toast.error("No Input Provided")
          return
        }
      }
      formData.append('option', option)
      startTime = Date.now()
      setLoading(true)

      setOutput(<div >Loading...</div>)

      const response = await axios.post('http://localhost:3333/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
     
      endTime = Date.now()
      setIsOutputGen(true)
      setGenTime(Math.round((endTime-startTime)/1000))
      setOutput(
        <audio controls>
            <source src={`${response.data.output}`} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio> )

      toast.success("Sucessfully Generated Output!", {autoClose:1500})
      
      setLoading(false)


    } catch (error) {
        toast.error("Server Error, Try Again!", {autoClose:1500})
        setLoading(false)
        setOutput("")
    } 
  }


  

  return (
    <div className={loading?"pointer-events-none cursor-none": ''}>

    {loading?
      <div className="pointer-events-none cursor-none fixed inset-0 z-50 opacity-70 grid place-content-center backdrop-blur-sm  bg-gray-300 space-y-4">
      <Spinner color="blue" className="h-20 w-20" />
      <h4 className="text-gray-600 text-md">Loading ...</h4>
      </div>
      :
      <div></div>}

    <div className="box-border my-10 px-28 space-y-10">
      
      {/* === HEADING & Highlight ===  */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl text-purple-700 font-bold">Transform your Voice in 3 Simple Steps</h1>
        <div className="w-full flex justify-center">
         <p className="text-gray-600 w-[45%]">DeepCloning Transforms your voice in Realistic artist vocals.</p>
        </div>
      </div>
      {/* =========== END of Heading =========== */}


      {/* ========== INPUT AND Recording Files ========== */}
      <div className="flex justify-center">
          <div className="w-[600px] h-auto  bg-gray-50 rounded shadow-lg shadow-indigo-100 text-center px-10 py-8">

            {/* === Heading === */}
            <h1 className="text-xl   text-purple-700 font-bold">Clone your voice</h1> 
            {/* <p className="text-sm text-gray-500 dark:text-gray-300" >Input audio should not be more than 30 sec.</p> */}
            {/* ===End Heading=== */}

            {/* =========== FILE INPUT ========== */}
            <div className="flex justify-between mt-10">
              
              <div className='w-full'>
              <div className="w-full mt-1 flex items-center justify-between">
                <div>
                  <label className="relative cursor-pointer bg-yellow-800 hover:bg-amber-700 text-white   font-semibold py-2 px-4 rounded-lg shadow-md">
                  <span>
                  <FontAwesomeIcon icon={"folder-open"} className='pr-2 text-yellow-900' />
                    Choose File</span>
                  <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0   cursor-pointer" 
                  onChange={useFileChange}/>
                  </label>
                </div>
                <div className='mx-2 px-1 border-2 rounded text-indigo-600'>{filename}</div>
              </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 text-start" id="file_input_help">Upload .mp3 or .wav file.</p>
              </div>
            </div>
            {/* ================== END FileInput ==================== */}

            
            
            <div className='text-center flex flex-col items-center pt-6 pb-2'>
                <div className='w-[50%] bg-gray-400 pt-[2px] rounded'></div>
                <p className=' z-1 w-16 relative bottom-3 bg-gray-50 px-1 rounded-fill text-gray-600'>OR</p>
            </div>


            {/* ============= RECORDING =============== */}
            <div className="overflow-hidden">

            <div className="flex justify-between">
              <div className="">
                {isRecording ? (
                <button onClick={stopRecording} className="bg-red-600 text-white px-4 py-2 rounded-lg ">
                  <FontAwesomeIcon icon={"circle-stop"} className='pr-2 text-yellow-900' />
                  Stop Recording</button>
                ) : (
                <button onClick={startRecording} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  <FontAwesomeIcon icon={"microphone"} className='pr-2 text-blue-900' />
                  Start Recording</button>
                )}
                
              </div>

              <div className='pr-2'>
                <span className="text-gray-600">
                  Record Time: 
                  <span className='text-2xl font-bold text-black'>
                    {` ${recordingTime}  `}</span> 
                  Seconds
                </span>
                {/* <button onClick={resetRecording} className="text-gray-800 bg-gray-300 px-4 py-2 rounded-lg">Reset Input</button> */}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 text-start" id="file_input_help">{`Not more than 45 seconds`}.</p>

            </div>
            {/* === End of Recording === */}


            {/* ======== OPTIONS ====== */}
            <div className='w-full bg-gray-800 pt-[2px] rounded mt-10'></div>
            
            <div className='w-full h-auto grid place-content-center pt-10 space-y-4'>

              <div className="w-72">
                  <p>Select Target Person Voice: </p>
                  <Select label="Select Voice" placeholder={""}
                  value={option}
                  onChange={(val)=> setOption(val)} success>

                    <Option value='Trump'>Trump</Option>
                    <Option value='Wajahat'>Wajahat</Option>
                    <Option value='Talha'>Talha</Option>
                    {/* <Option value='Biden'>Biden</Option> */}
                  </Select>         
              </div>

            </div>
            {/* ========= END OF OPTIONS ========= */}
            
            {/* ======= Generate Output Button ======== */}
            <div className='mt-14 mb-8'>
              <button className='px-[73px] py-2 bg-indigo-800 hover:bg-indigo-900 text-white font-bold rounded'
              onClick={generateOutput}>
                <FontAwesomeIcon icon="magic-wand-sparkles" className='pr-2' />
                Generate Audio</button>
            </div>
            {/* ========= End of BTN =========== */}


            {/* ======== INPUT ======== */}
                <div className='my-6 text-start'>
                  <h1 className='text-2xl font-bold '>Input:</h1>
                  <div className='flex justify-center text-gray-600'>
                    {inputFile}</div>
                </div>
            {/* ====== END Input ======== */}


            {/* ======== OUTPUT ======== */}
            <div className='my-6 text-start'>
                  <h1 className='text-2xl font-bold '>Output:</h1>
                  <div className='flex justify-center text-gray-600'
                  >
                    {Output}
                  </div>
                </div>
            {/* ====== END Output ======== */}
            {isOutputGen?
                <p className="font-bold text-sm text-green-500">
                  Generation Time:{" "}
                  <span className="font-normal text-sm ">{genTime} seconds</span>
                </p>
                : 
                <p></p>}




          </div>
      </div>

      {/* ====================== */}
      <ToastContainer
        position="top-right"
        style={{ marginTop: "4rem" }} 
        />
    </div>
    </div>
  )
}

export default VoiceCloning
