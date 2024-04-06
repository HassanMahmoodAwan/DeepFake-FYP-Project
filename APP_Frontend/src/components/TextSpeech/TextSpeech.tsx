import React from 'react'
import { Select, Option, Button } from "@material-tailwind/react";

function TextSpeech() {
  const speechSyn = new SpeechSynthesisUtterance();

  const [text, setText] = React.useState('')

  function textToSpeechFeature(){
    speechSyn.text = text
    window.speechSynthesis.speak(speechSyn)
  }

  return (
    <div className="w-full h-full  box-border px-3 md:px-10 lg:px-28 flex justify-center items-center">
      <div className="w-full my-14">
        <div className="w-full h-auto box-border space-y-1">
          <h1 className="text-center text-3xl font-bold">Text-To-Speech Deep Fake</h1>
          <div className="w-full block md:flex space-x-3">
            <div id="TextArea" className="w-full md:w-[50%] box-border p-5 text-start">
              <label htmlFor="TextBox" className="">Max Words Allowed 1000</label>
              <textarea id="TextBox" typeof="text" rows={9} placeholder="Enter your Mesage here" className="rounded text-base text-gray-800 w-full placeholder:text-base p-3 shadow-sm shadow-indigo-800"
                value={text}
                onChange={(e) => { setText(e.target.value) }}
              />
            </div>
            <div id="Options" className="w-full md:w-[50%] box-border px-5 md:py-10 flex md:flex-col items-end justify-between flex-wrap">
              <div className="w-72 lg:w-96 ">
                <h1 className="mb-1">Select Voice Over</h1>
                <Select color="purple" label="Select Version" placeholder={''} className="bg-white text-black">
                  <Option>Dr Wajahat Qazi</Option>
                  <Option>Muhammad Talha</Option>
                </Select>
              </div>
              <div className="hidden md:block  w-72 lg:w-96 ">
                <h1>Language</h1>
                <Select label="Select Version" placeholder={''} value="English" disabled >
                  <Option>English</Option>
                </Select>
              </div>
              <div className="mt-7">
                <Button variant="filled" placeholder={''} className="bg-indigo-800 w-72 lg:w-96 "
                  onClick={textToSpeechFeature}>
                  Convert to Speech
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextSpeech
