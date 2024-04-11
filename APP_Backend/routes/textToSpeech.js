const express = require('express')
const app = express.Router()
const bodyParser = require('body-parser');
const path = require("path")
const Replicate = require('replicate');
const { readFile } = require('fs').promises;


app.use(bodyParser.json());


const REPLICATE_API_TOKEN="r8_06l6hwas5tCLkIEaTteQsVhantyhuU90rYoZo"
// const REPLICATE_API_TOKEN="r8_8RntfbSfbVynvHdwJFK0Q2ap5jhN5ww2p05rf"
const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
})


let options;
let texts;
let presets

app.route("/upload").get( async(req, res)=>{
  if (options && texts && presets){
    try {
      
      let image
      if (options == "Wajahat"){
        // const data = (await readFile(`./public/audio/${uploadedFile.name}`)).toString('base64')
        // image = `data:application/octet-stream;base64,${data}`;
        image = "https://replicate.delivery/pbxt/235fJealHPlzgEsX0mwWwJQFkUKeHQmOYNjO5dUSQYeOUoiKB/tmpugf8hnq9file_stereo%20%28Trump%20Ver%29.mp3"
      }
      else if (options == "Trump"){
        image = "https://replicate.delivery/pbxt/235fJealHPlzgEsX0mwWwJQFkUKeHQmOYNjO5dUSQYeOUoiKB/tmpugf8hnq9file_stereo%20%28Trump%20Ver%29.mp3";
      }
      else if (options == "Hassan"){
       image = "https://replicate.delivery/pbxt/235fJealHPlzgEsX0mwWwJQFkUKeHQmOYNjO5dUSQYeOUoiKB/tmpugf8hnq9file_stereo%20%28Trump%20Ver%29.mp3"
      }

    const input = {     
            seed: 0,
            text: texts,
            preset: presets,
            voice_a: "custom_voice",
            voice_b: "disabled",
            voice_c: "disabled",
            cvvp_amount: 0,
            custom_voice: image,
    }
    console.log("Input Provided, Wait Now")

    const output = await replicate.run(
      "afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71",
      {input}
    
    );
    console.log("Output Generated: ");
    console.log(output);

    res.send(output)
    uploadedFile = undefined
    options = undefined
    texts = undefined
    return

    } catch (error) {
      console.error(error)
      return;
   }
  }else {
    console.log("No Input Provided")
  } 
})

app.route('/text_option').post((req, res) => {
   const { text, option, preset } = req.body;
   texts = text.toString()
   options = option
   presets = preset
  
  console.log("Option received")
  console.log(texts)
  console.log(options)
  console.log(presets)
  res.send('Option received To backend');
})


module.exports = app