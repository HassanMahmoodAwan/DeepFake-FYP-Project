import React, { useState, useRef, useEffect } from 'react'
import { Select, Option, Button, Alert } from "@material-tailwind/react";
import axios from 'axios';

function TextSpeech() {

  const [text, setText] = React.useState('')
  const [option, setOption] = useState<string>("Trump")
  const [preset, setPreset] = useState<string>("fast")
  
  const [openAlert, setOpenAlert] = useState(false)
  const [alertColor, setAlertColor] = useState<any>("yellow")
  const [alertMsg, setAlertMsg] = useState("Alert Message")

  const [output, setOutput] = useState(null)
  const [showOutput, setShowOutput] = useState(false)



  // ============ OUTPUT ===========
  async function generateOutput(){
    try {
      if (text && option && preset){
          await fetch('/textToSpeech/text_option', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text, option, preset })
        })

        setOutput("Loading Generated Audio!")
        setShowOutput(prev => !prev)
      }
      else {
        console.log("Text not Provided") 
        alert("Text not Provided")
      } 

    } catch (error) {
        setAlertColor("red")
        setAlertMsg(" Server Error 500! ")
        setOpenAlert(true)
    } 
  }

  useEffect(()=>{
    ;(async()=>{
      if (showOutput){
        try{
          const response = await axios.get("/textToSpeech/upload")
          setOutput(
            <audio controls>
                <source src={`${response.data}`} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio> 
            )
        }
        catch(error){ 
          setOutput("Error Generating Ouput!")
        }
      }            
    })()
    
    setShowOutput(true)
}, [showOutput])
// ================= END OF OUTPUT ==========


  return (
    <>
    {/* ===== Alert ===== */}
    <Alert
    color={alertColor}
    open={openAlert}
    onClose={() => setOpenAlert(false)}
    animate={{
      mount: { y: 0 },
      unmount: { y: 100 },
    }
    }
    className='rounded px-10'
  >
    {alertMsg}
  </Alert>
  {/* End of Alert */}


    
    <div className="w-full h-full  box-border px-3 md:px-10 lg:px-28 flex justify-center items-center">
      <div className="w-full my-14">
        <div className="w-full h-auto box-border space-y-1">

          {/* ===== Heading ===== */}
          <h1 className="mb-16 text-center text-3xl font-bold">Text-To-Speech Deep Fake</h1>
          {/*=== End of Heading===*/}

          <div className="w-full block md:flex space-x-3">
            {/* ===== Text BOX ===== */}
            <div id="TextArea" className="w-full md:w-[50%] box-border p-5 text-start">
              <label htmlFor="TextBox" className="text-gray-600 text-sm">Max Words Allowed 1000</label>
              <textarea id="TextBox" typeof="text" rows={9} placeholder="Enter your Mesage here" className="rounded text-base text-gray-800 w-full placeholder:text-base p-3 shadow-sm shadow-indigo-800"
                value={text}
                onChange={(e) => { setText(e.target.value) }}
              />
            </div>
            {/* ======= End of Text Box ========= */}

            {/* ======== Side Options ====== */}
            <div id="Options" className="w-full md:w-[50%] box-border px-5 md:py-10 flex md:flex-col items-end flex-wrap space-y-12">
             
             {/* ==== Select Options ==== */}
              <div className="w-72 lg:w-96 ">
                <h1 className="mb-1 text-md font-bold">Select Voice Over</h1>
                <Select label="Select Voice" placeholder={""}
                  value={option}
                  onChange={(val)=> setOption(val)} success>

                    <Option value='Hassan'>Hassan</Option>
                    <Option value='Trump'>Trump</Option>
                    <Option value='Wajahat'>Wajahat</Option>

                  </Select>    
              </div>
              {/* ====== End Select Options ====== */}

              {/* ==== Preset Options ==== */}
              <div className="w-72 lg:w-96 ">
                <h1 className="mb-1 text-md font-bold">Preset</h1>
                <Select label="Select" placeholder={""}
                  value={preset}
                  onChange={(val)=> setPreset(val)}>

                    <Option value='ultra_fast'>Ultra_Fast</Option>
                    <Option value='fast'>Fast</Option>
                    <Option value='high_quality'>High Quality</Option>
                    <Option value='standard'>Standard</Option>

                  </Select>    
              </div>
              {/* ====== End Preset Options ====== */}
              
            </div>
          </div>

              {/* ==== Generate Audio Button ===== */}
              <div className="pt-8 w-full flex justify-center">
                <Button variant="filled" placeholder={''} className="bg-indigo-800 w-72 lg:w-96 "
                  onClick={generateOutput}>
                  Convert to Speech
                </Button>
              </div>
              {/* ====End Generate BTN ======== */}


              {/* ===== Output ======= */}
              <div className='pt-12 flex items-center'>
                <h1 className="mb-2 text-lg font-bold">Output: </h1>
                <div className='px-5'>
                  {output}</div>
              </div>
              {/* =====End of Outupt== */}

        </div>
      </div>
    </div>
    </>
  )
}

export default TextSpeech
