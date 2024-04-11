// DONOT USE IT
import React from 'react'

function tts() {
    const [filename, setFilename] = useState("Choose File")
    const [uploadFile, setUploadFile] = useState(null)        // Go at Backend
    const [input, setInput] = useState(null)
    const [showInput, setShowInput] = useState(false)


    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [audioURL, setAudioURL] = useState(null)
    const chunksRef = useRef([])
    const timerRef = useRef(null)



    
  // ===== FIle Input ======
  function useFileChange(e){
    const file = e.target.files[0]
    if (file){
      setUploadFile(file)
      setFilename(file.name)
    }else{
      setFilename("No file Chooses")
    }
  }
  async function handleFile(){
    if (uploadFile){
      try {
        const formData = new FormData();
        formData.append('file', uploadFile)

        // Note: to Server.
        await axios.post('/textToSpeech/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        if (!openAlert){
          setAlertColor("green")
          setAlertMsg(" File Uploaded Successfully! ")
          setOpenAlert(true)
        }
        setShowInput(prev=>!prev)

      } catch (error) {
        console.error('Error uploading file:', error)
        if (!openAlert){
          setAlertColor("red")
          setAlertMsg(" Error Uploading File! ")
          setOpenAlert(true)
        }
      } 
    }
    else {
      if (!openAlert){
        setAlertColor("red")
        setAlertMsg(" File Not Provided! ")
        setOpenAlert(true)
      }
      setInput(
      <div className='text-red-500 text-lg text-center'>
          File Not Provided !
      </div>)
    }
  }
  // ===== End File Input ======
  // =======Input USE-Effect =======
  useEffect(()=>{     
    if (showInput && uploadFile){
      setInput(
        <audio controls>
          <source src={`http://localhost:3000/audio/${uploadFile.name}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio> )
        
    }else {
      setInput("Provide Audio")
    }
    
    setShowInput(true)
  }, [showInput])
  // =============================== //



  // ====== REcording Audio =========== 
  const sendRecording = async (blob, fileDate)=>{
    
    const formData = new FormData();
    formData.append('file', blob, `Text_${fileDate}.mp3` );
    
    try{
    // Note: to Server.
    const response = await axios.post('/textToSpeech/upload', formData, {
      headers: {
        'Content-Type': 'audio/mpeg'
      }
    });
    

  }catch (error) {
    console.error('Error uploading file:', error)

    setAlertColor("red")
    setAlertMsg(" Error Uploading File! ")
    setOpenAlert(true)
  } 
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      // if (recorder.state === 'inactive'){

      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/mp3' })
        const url = URL.createObjectURL(blob)
        const fileDate = Date.now()
        sendRecording(blob, fileDate)
        // setUploadFile(fileDate)

        setInput(
            <audio controls>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>  
        )

        clearInterval(timerRef.current)
      }
    // }
      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)

      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);

      
    } catch (error) {
      console.error('Error accessing the microphone:', error)
      setAlertColor("red")
      setAlertMsg(" Error Accessing MicroPhone! ")
      setOpenAlert(true)

    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
     
      mediaRecorder.stop()
      setIsRecording(false)
    }
  };

  const resetRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    chunksRef.current = [];
    setAudioURL(null);
    
  }
  // ==== End of Recording Input ====


  const speechSyn = new SpeechSynthesisUtterance()
  function textToSpeechFeature(){
    speechSyn.text = text
    window.speechSynthesis.speak(speechSyn)
  }


  return (
    <>
        {/* ====INPUT Audio TTS====== */}
        <div className='w-full h-auto flex items-center justify-between border border-gray-400 px-6 py-3 rounded'>

<div className="flex justify-between w-[45%]">
    <div>
    <div className="mt-1 flex items-center">
      <label className="relative cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
      <span>Choose File</span>
      <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" 
      onChange={useFileChange}/>
      </label>
      <span className='mx-2 px-1 border-2 rounded text-indigo-600'>{filename}</span>
    </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 text-start" id="file_input_help">Upload .mp3 or .wav file.</p>
    </div>

    <div>
      <button className='px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white'
      onClick={handleFile}>Submit file</button>
    </div>
  </div>

  {/* === Divider ===== */}
  <div className='w-[2%] flex flex-col items-center justify-center'>
    <div className='border-l-[1.2px] border-gray-400 h-20'></div>
    <p className='relative bottom-12 bg-gray-200 rounded text-gray-600 text-center text-xs'>OR</p>
  </div>
  {/* ===End of Divider */}

  {/* ============= RECORDING =============== */}
  <div className=" overflow-hidden w-[45%]">

  <div className="">
    {/* <h2 className="text-lg font-semibold mb-4 text-gray-700">Record Voice</h2> */}
    <div className="flex items-center justify-center mb-4">
      {isRecording ? (
      <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded-lg ">Stop Recording</button>
      ) : (
      <button onClick={startRecording} className="bg-indigo-700 text-white px-4 py-2 rounded-lg">Start Recording</button>
      )}
    </div>

    
    <div className='flex justify-between'>
      <span className="text-gray-600">
        Record Time: 
        <span className='text-xl font-bold text-gray-800'>
          {` ${recordingTime}  `}</span> 
        Sec's
      </span>

      <button onClick={resetRecording} className="bg-gray-300 hover:bg-gray-400 text-gray-950 px-4 py-2 rounded-lg">Reset Input</button>
    </div>

  </div>

  </div>
  {/* === End of Recording === */}
  
</div>
{/* ======== End Input ====== */}



              {/* ===== Input ======= */}
              <div className="hidden md:flex items-center w-72 lg:w-96 mt-16">
                <h1 className='text-md font-bold'>Input: </h1>
                <div className='px-5'>{input}</div>
              </div>
              {/* ===== End Input ===== */}


      
    </>
  )
}

export default tts