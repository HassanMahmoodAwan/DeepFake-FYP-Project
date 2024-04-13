import React, { useState, useRef } from 'react';

const Recorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const chunksRef = useRef([]);
  const [inputFile, setInputFile] = useState(null);

  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        setInputFile(
          <audio controls>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
        chunksRef.current = [];
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.pause();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && !isRecording) {
      mediaRecorder.resume();
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setRecordingTime(0)
      setInputFile(null)
    }
  };

  const resetRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    chunksRef.current = [];
    setInputFile(null);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-4">
        {isRecording ? (
          <>
            {/* <button onClick={pauseRecording} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
              Pause Recording
            </button> */}
            <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2">
              Stop Recording
            </button>
          </>
        ) : (
          <button onClick={startRecording} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Start Recording
          </button>
        )}
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 text-start" id="file_input_help">
          Recording should not be  45 sec.
        </p>
      </div>

      <div className='flex justify-between'>
        <span className="text-gray-600">
          Record Time: 
          <span className='text-2xl font-bold text-black'>
            {` ${recordingTime}  `}
          </span> 
          Sec's
        </span>
        {/* <button onClick={resetRecording} className="text-gray-800 bg-gray-300 px-4 py-2 rounded-lg">Reset Input</button> */}
      </div>
      
      {inputFile && (
        <div>
          {inputFile}
        </div>
      )}
    </div>
  );
};

export default Recorder;
