const express = require('express')
const app = express.Router()
const fileUpload = require("express-fileupload")
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



let uploadedFile ;
let options;
let texts;

app.route("/upload").get( async(req, res)=>{
  // console.log(options)
  if (options && texts){
    try {

      let image ;
      if (options == "Wajahat"){
        const data = (await readFile(`./public/audio/${uploadedFile.name}`)).toString('base64'); // Await the result of readFile
        image = `data:application/octet-stream;base64,${data}`;
      }
      else if (options == "Custom"){
        const data = (await readFile(`./public/audio/${uploadedFile.name}`)).toString('base64'); // Await the result of readFile
        image = `data:application/octet-stream;base64,${data}`;
      }
      else if (options == "Hassan"){
        console.log("working")
        // const  data = (await readFile(`./public/audio/sampleAudio.mp3`)).toString('base64'); // Await the result of readFile
        // const image = `data:application/octet-stream;base64,${data}`;
        // const data = (await readFile(`./public/audio/${uploadedFile.name}`)).toString("base64");
        // const image = `data:application/octet-stream;base64,${data}`;
       const image = await readFile(`./public/audio/${uploadedFile.name}`)
       const input = {
            
            // text: texts,
            voice_a: "custom_voice",
            custom_voice: image,
            text: texts
      }
      
      console.log("Input Provided, Wait Now")
      
      const output = await replicate.run(
        "afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71",
        {input}

      );
      console.log("Output Generated: ");
      console.log(output);
    }

      

      console.log("Output Generated: ");
      console.log(output);
      
      res.send(output)
      uploadedFile = undefined
      options = undefined
      texts = undefined
      return;

    } catch (error) {
      console.error(error)
      return;
   }

  } 
})

app.route("/upload").post( async(req, res)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' })
      }

      uploadedFile = req.files.file;
      const uploadPath = path.join(__dirname, '../public/audio', uploadedFile.name);
    
      // Save the file to the public directory
      await uploadedFile.mv(uploadPath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error uploading file.' });
        }
        res.json({ message: 'File uploaded successfully.' });
      });
})

app.route('/option').post((req, res) => {
  // option = req.body; 

   const { text, option } = req.body;
   texts = text.toString()
   options = option
  console.log(options)
  console.log(texts);
 
  res.send('Option received by backend');
})




module.exports = app