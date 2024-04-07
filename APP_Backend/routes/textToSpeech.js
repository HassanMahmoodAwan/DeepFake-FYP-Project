const express = require('express')
const app = express.Router()
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser');

const path = require("path")
const Replicate = require('replicate');
const { readFile } = require('fs').promises;




const REPLICATE_API_TOKEN="r8_06l6hwas5tCLkIEaTteQsVhantyhuU90rYoZo"
// const REPLICATE_API_TOKEN="r8_8RntfbSfbVynvHdwJFK0Q2ap5jhN5ww2p05rf"
const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
})






module.exports = app