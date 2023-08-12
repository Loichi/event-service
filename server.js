// server.js
const cors = require('cors');
const eventRoute = require('./route/EventRoute');
const express = require("express");
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://Loichi:mdp123@cluster0.srdtv22.mongodb.net/?retryWrites=true&w=majority";

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connect();

const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.use('/events', eventRoute);

module.exports = server; 
