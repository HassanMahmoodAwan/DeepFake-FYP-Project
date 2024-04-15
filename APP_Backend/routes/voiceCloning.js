const express = require('express')
const app = express.Router()
const multer = require('multer');

const path = require("path")
const Replicate = require('replicate');
const { readFile } = require('fs').promises;



const REPLICATE_API_TOKEN="r8_06l6hwas5tCLkIEaTteQsVhantyhuU90rYoZo"
// const REPLICATE_API_TOKEN="r8_8RntfbSfbVynvHdwJFK0Q2ap5jhN5ww2p05rf"
const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
});


let uploadedFile
let option

app.route("/upload").get( async(req, res)=>{
  if (uploadedFile && option){
    try {
      const data = (await readFile(`./public/audio/${uploadedFile.originalname}`)).toString ('base64')
      const image = `data:application/octet-stream;base64,${data}`
      
      let input;
      switch(option){
        case "Wajahat":
          input = {
            rvc_model: "CUSTOM",
            custom_rvc_model_download_url: "https://replicate.delivery/pbxt/eDqhKrXNU7UxESSEve5MJTtyFr2wFeReNUfKY1mSycmqP87UC/wajahat_qazi.zip",
            song_input: image,
            main_vocals_volume_change: 10
          }
          break
        
        case "ImranKhan":
          input = {
            rvc_model: "CUSTOM",
            custom_rvc_model_download_url: "https://replicate.delivery/pbxt/YyUdeoFLwFQFLKjfO1QJokWM40EznTaJgGB2AUDnleb9XGUlA/imran_niazi.zip",
            song_input: image,
            main_vocals_volume_change: 10
          }
          break
        
        default:
          input = {
            rvc_model: option,
            song_input: image,
            main_vocals_volume_change: 10
        }
        break
      }

      console.log("Input Provided, Wait Now")

      const output = await replicate.run("zsxkib/realistic-voice-cloning:0a9c7c558af4c0f20667c1bd1260ce32a2879944a0b9e44e1398660c077b1550", { input })

      console.log("Output Generated: ");
      console.log(output);
      
      res.send(output)
      uploadedFile = undefined
      option = undefined
      return;

    } catch (error) {
      res.send("Error while Running Model")
      console.error(error)
      return;
   }

  } 
})


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/audio'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.route("/upload").post(upload.single('file'), (req, res) => {
  // File Upload Logic
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

   uploadedFile = req.file;
   option = req.body.option;
   console.log(uploadedFile.originalname)
   console.log(option)


  res.json({ message: 'File uploaded successfully.' });

  
});



// ====== End of Multer =======



module.exports = app