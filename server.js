// server.js
const cors = require('cors');

const express = require("express");
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://Loichi:mdp123@cluster0.srdtv22.mongodb.net/?retryWrites=true&w=majority";

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

async function connect() {
  
  try{
    await mongoose.connect(uri);
    console.log("connected to MongoDb");
  }catch{
    console.error(error);
  }
}
connect();

app.listen(8000, () => {
  console.log("Server starter on port 8000");
})
