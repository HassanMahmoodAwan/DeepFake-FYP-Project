import React, { useState } from "react";
import { Select, Option, Button, Textarea, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TextSpeech() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("Wajahat");
  // const [preset, setPreset] = useState("fast");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");

  const countCharacters = (inputText) => {
    setCharCount(inputText.length);
  };

  const generateOutput = async () => {
    // console.log(text);  
    try {
      if (text && option) {
        setLoading(true);
        const response = await axios.post("http://localhost:3333/tts/output", {
          text,
          option,
        });
        setAudioSrc(response.data);
        setLoading(false);
      } else {
        console.log("Text not Provided");
        alert("Text not Provided");
      }
    } catch (error) {
      console.error("Error generating output:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full box-border px-3 md:px-10 lg:px-28 flex justify-center items-center">
        <div className="w-full my-8">
          <div className="w-full h-auto box-border space-y-1">
            <div className="mb-10">
              <h1 className="text-center text-purple-700 text-3xl font-bold">DeepFake Text-To-Speech</h1>
              <p className="mt-1 text-center text-gray-600 text-sm">
                Generate Speech based on provided text and <br />
                targeted person option.
              </p>
            </div>
            <div className="w-full block md:flex space-x-3">
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
                    countCharacters(e.target.value);
                  }}
                />
                <p className="font-bold text-base text-gray-900">
                  Character Count:{" "}
                  <span className="font-normal text-sm text-gray-800">{charCount}</span>
                </p>
                <div className="py-4 flex items-center">
                  <h1 className=" text-lg">Output: </h1>
                  <div className="px-5 text-gray-600 text-base">
                    {loading ? (
                      <div className="flex">
                        Loading
                        <span>
                          <Spinner className="ml-4" color="blue" />
                        </span>
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
              <div className="w-full md:w-[50%] box-border px-5 md:py-10 flex md:flex-col items-end flex-wrap space-y-12">
                <div className="w-72 lg:w-96 ">
                  <h1 className="mb-1 text-md font-bold">Select Voice Over</h1>
                  <Select
                    label="Select Voice"
                    placeholder=""
                    value={option}
                    onChange={(val) => setOption(val)}
                    success
                  >
                    {/* <Option value="daniel">Daniel</Option> */}
                    {/* <Option value="emma">Emma</Option> */}
                    {/* <Option value="ImranKhan">Imran Khan</Option> */}
                    <Option value="Wajahat">Wajahat</Option>
                    <Option value="Trump">Trump</Option>
                    <Option value="Talha">Talha</Option>
                  </Select>
                </div>
                {/* <div className="w-72 lg:w-96 ">
                  <h1 className="mb-1 text-md font-bold">Preset</h1>
                  <Select
                    label="Select"
                    placeholder=""
                    value={preset}
                    onChange={(val) => setPreset(val)}
                  >
                    <Option value="ultra_fast">Ultra_Fast</Option>
                    <Option value="fast">Fast</Option>
                    <Option value="high_quality">High Quality</Option>
                    <Option value="standard">Standard</Option>
                  </Select>
                </div> */}
                <div className="w-72 lg:w-96 ">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextSpeech;
