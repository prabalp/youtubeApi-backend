const express = require("express");
const app = express();
const router = require("express").Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const { db_connect } = require("./db_connection");
const { api_response, api_schedule } = require("./api_scheduler");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static(__dirname + "/public/"));

//enviromental variables
const URL = process.env.MONGODB_URI;
const API_KEY = process.env.YOUTUBE_API_KEY;
const searchQuerry = process.env.SEARCH_QUERRY;

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("Hello World");
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.listen(3000, async () => {
  console.log("Listening on port 3000");
  db_connect(URL);

  //   await sleep(5000);
  api_schedule();
});
