import React, { useState, useRef, useEffect } from "react";
import {
  Select,
  Option,
  Button,
  Alert,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TextSpeech() {
  const [text, setText] = React.useState("");
  const [option, setOption] = useState<string>("Trump");
  const [preset, setPreset] = useState<string>("fast");
  const [charCount, setCharCount] = useState<number>(0);

  const [output, setOutput] = useState<JSX.Element | string>(
    "No Generated Output!"
  );
  const [showOutput, setShowOutput] = useState(false);

  // ============ OUTPUT ===========
  async function generateOutput() {
    try {
      if (text && option && preset) {
        await fetch("/textToSpeech/text_option", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, option, preset }),
        });

        setOutput(
          <div className="flex">
            Loading
            <span>
              <Spinner className="ml-4" color="blue" />
            </span>
          </div>
        );
        setShowOutput((prev) => !prev);
      } else {
        console.log("Text not Provided");
        alert("Text not Provided");
        return;
      }
    } catch (error) {
      // setAlertColor("red")
      // setAlertMsg(" Server Error 500! ")
      // setOpenAlert(true)
    }
  }

  useEffect(() => {
    (async () => {
      if (showOutput) {
        try {
          const response = await axios.get("/textToSpeech/upload");
          setOutput(
            <audio controls>
              <source src={`${response.data}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          );
        } catch (error) {
          setOutput("Error Generating Ouput!");
        }
      }
    })();

    setShowOutput(true);
  }, [showOutput]);

  
  const countCharacters = (inputText) => {
    setCharCount(inputText.length);
  };

  return (
    <>
      {/* ===== Alert ===== */}
      {/* <Alert
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
  </Alert> */}
      {/* End of Alert */}

      <div className="w-full h-full  box-border px-3 md:px-10 lg:px-28 flex justify-center items-center">
        <div className="w-full my-8">
          <div className="w-full h-auto box-border space-y-1">
            {/* ===== Heading ===== */}
            <div className="mb-10">
              <h1 className="text-center  text-purple-700 text-3xl font-bold">
                DeepFake Text-To-Speech
              </h1>
              <p className="mt-1 text-center text-gray-600 text-sm">
                Generate Speech based on provided text and <br />
                targeted person option.
              </p>
            </div>
            {/*=== End of Heading===*/}

            <div className="w-full block md:flex space-x-3  ">
              {/* ===== Text BOX ===== */}
              <div
                id="TextArea"
                className="w-full md:w-[50%] box-border p-5 text-start"
              >
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

                  {/* ===== Output ======= */}
            <div className="py-4 flex items-center">
              <h1 className=" text-lg">Output: </h1>
              <div className="px-5 text-gray-600 text-base">{output}</div>
            </div>
            {/* =====End of Outupt== */}

              </div>
              {/* ======= End of Text Box ========= */}

              {/* ======== Side Options ====== */}
              <div
                id="Options"
                className="w-full md:w-[50%] box-border px-5 md:py-10 flex md:flex-col items-end flex-wrap space-y-12"
              >
                {/* ==== Select Options ==== */}
                <div className="w-72 lg:w-96 ">
                  <h1 className="mb-1 text-md font-bold">Select Voice Over</h1>
                  <Select
                    label="Select Voice"
                    placeholder={""}
                    value={option}
                    onChange={(val) => setOption(val)}
                    success
                  >
                    <Option value="daniel">Daniel</Option>
                    <Option value="emma">Emma</Option>
                    <Option value="ImranKhan">Imran Khan</Option>
                    <Option value="Wajahat">Wajahat</Option>
                    <Option value="Trump">Trump</Option>
                  </Select>
                </div>
                {/* ====== End Select Options ====== */}

                {/* ==== Preset Options ==== */}
                <div className="w-72 lg:w-96 ">
                  <h1 className="mb-1 text-md font-bold">Preset</h1>
                  <Select
                    label="Select"
                    placeholder={""}
                    value={preset}
                    onChange={(val) => setPreset(val)}
                  >
                    <Option value="ultra_fast">Ultra_Fast</Option>
                    <Option value="fast">Fast</Option>
                    <Option value="high_quality">High Quality</Option>
                    <Option value="standard">Standard</Option>
                  </Select>
                </div>
                {/* ====== End Preset Options ====== */}

                {/* ==== Generate Audio Button ===== */}
            <div className="w-72 lg:w-96  ">
              <Button
                variant="filled"
                placeholder={""}
                className="bg-indigo-800 w-72 lg:w-96 "
                onClick={generateOutput}
              >
                <FontAwesomeIcon icon="magic-wand-sparkles" className="pr-2" />
                Convert to Speech
              </Button>
            </div>
            {/* ====End Generate BTN ======== */}
              </div>
            </div>  

            

           
          </div>
        </div>
      </div>
    </>
  );
}

export default TextSpeech;
