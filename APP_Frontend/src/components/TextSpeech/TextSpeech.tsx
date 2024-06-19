import React, { useState } from "react";
import { Select, Option, Button, Textarea, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

function TextSpeech() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("Wajahat");
  const [loading, setLoading] = useState(true);
  const [isOutputGen, setIsOutputGen] = useState<boolean>(false)
  const [genTime, setGenTime] = useState<null | number | string>(null)
  const [audioSrc, setAudioSrc] = useState("");

  let startTime:number;
  let endTime:number;

  const generateOutput = async () => {
    console.log(text.split(" ").length)
    if (text.split(" ").length > 500){
      toast.error("Text exceeded 500 Words!")
      return
    }

    try {
      if (text && option) {
        startTime = Date.now()
        setLoading(true);
        const response = await axios.post("http://localhost:3333/tts/output", {
          text,
          option,
        });
        setAudioSrc(response.data)
        endTime = Date.now()
        setIsOutputGen(true)
        setGenTime(Math.round((endTime-startTime)/1000))
        setLoading(false);
      } else {
        console.log("Text not Provided");
        toast.error("Text not Provided", {autoClose:1500})
      }
    } catch (error) {
      console.error("Error generating output:", error);
      setLoading(false);
    }
  };

  return (
    <div className={loading?"pointer-events-none": ''}>

    {loading?
    <div className=" fixed inset-0 z-50 opacity-70 grid place-content-center backdrop-blur-sm bg-gray-300 space-y-4">
    <Spinner color="blue" className="h-20 w-20" />
    <h4 className="text-gray-600 text-md">Loading ...</h4>
    </div>
    :
    <div></div>}

      <div className="w-full h-full box-border px-3 md:px-10 lg:px-20 flex justify-center items-center">
        <div className="w-full my-8">
          <div className="w-full h-auto box-border space-y-1">

            {/* ===== Heading ======= */}
            <div className="mb-10">
              <h1 className="text-center text-purple-700 text-3xl font-bold">DeepFake Text-To-Speech</h1>
              <p className="mt-1 text-center text-gray-600 text-sm">
                Generate Speech based on provided text and <br />
                targeted person option.
              </p>
            </div>
            {/* ======================= */}


            <div className="w-full block md:flex space-x-3">

              {/* ====== TextBox ======= */}
              <div id="TextArea" className="w-full md:w-[50%] box-border p-5 text-start">
                <label htmlFor="TextBox" className="text-gray-600 text-sm">
                  Max Words Allowed 500
                </label>
                <Textarea
                  id="TextBox"
                  typeof="text"
                  rows={12}
                  placeholder="Enter your Mesage here"
                  className="rounded text-base text-gray-800 w-full placeholder:text-base p-3 shadow-md shadow-gray-400"
                  label=""
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  onClick={()=>setIsOutputGen(false)}
                />
                <p className="font-bold text-base text-gray-900">
                  Words Count:{" "}
                  <span className="font-normal text-sm text-gray-800">{text.split(" ").length}</span>
                </p>

                {isOutputGen?
                <p className="font-bold text-sm text-green-500">
                  Generation Time:{" "}
                  <span className="font-normal text-sm ">{genTime} seconds</span>
                </p>
                : 
                <p></p>}

                <div className="py-4 flex items-center">
                  <h1 className=" text-lg font-bold">Output: </h1>
                  <div className="px-5 text-gray-600 text-base">
                    {loading ? (
                      <div className="flex">
                        Loading...
                        
                      </div>
                    ) : (
                      <audio controls>
                        <source src={audioSrc} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                </div>
              </div>
              {/* ======================== */}

              {/* ======== RightSide OPTIONS ========= */}
              <div className="w-full md:w-[50%] box-border px-5 md:py-8 flex md:flex-col items-end flex-wrap space-y-5">

                <div className="w-72 lg:w-96 ">
                  <h1 className="mb-1 text-md font-bold">Select Voice Over</h1>
                  <Select
                    label="Select Voice"
                    placeholder=""
                    value={option}
                    onChange={(val) => setOption(val)}
                    success
                  >
                    {/* <Option value="ImranKhan">Imran Khan</Option> */}
                    <Option value="Trump">Trump</Option>
                    <Option value="Wajahat">Wajahat</Option>
                    <Option value="daniel">Daniel</Option>
                    <Option value="Talha">Talha</Option>
                    <Option value="emma">Emma</Option>
                  </Select>
                </div>

                <div className="w-72 lg:w-96 ">
                  <h1 className="mb-1 text-md font-bold">Select Language</h1>
                  <Select
                    label="Select Language"
                    placeholder=""
                    value={"English"}
                    onChange={()=>(false)}
                  >
                    <Option value="English">English</Option>
                  </Select>
                </div>
                
                <div className="w-72 lg:w-96 pt-12">
                  <Button
                    variant="filled"
                    placeholder=""
                    className="bg-indigo-800 w-72 lg:w-96"
                    onClick={generateOutput}
                  >
                    <FontAwesomeIcon icon="magic-wand-sparkles" className="pr-2" />
                    Convert to Speech
                  </Button>
                </div>

              </div>
              {/* ======================= */}

            </div>

            {/* ======== Voice Clonning Link ======= */}
            <div className="flex w-full h-auto px-5 justify-between py-7">
              <div className="w-[50%] justify-start">
                    <h1 className="text-2xl font-bold">Voice Cloning: Clone your speech into given Voices</h1>
                    <p className="text-sm text-gray-800">Now you can Provide your Voice  & Cloning, Speech-to-Speech.</p>
              </div>
              <div className="w-[40%] flex  justify-end items-end">
                    <a href="#"><button className="bg-ttsPurple px-8 py-2 rounded text-white">
                      VoiceCloning
                      {/* <FontAwesomeIcon icon="magic-wand-sparkles" className="pl-4" /> */}
                      <FontAwesomeIcon icon={faCircleArrowRight} className="pl-4 " />
                      </button></a>
              </div>


            </div>
            {/* ==================================== */}



          </div>
        </div>
      </div>
      {/* ====================== */}
      <ToastContainer
        position="top-right"
        style={{ marginTop: "4rem" }} 
        />
    </div>
  );
}

export default TextSpeech;
