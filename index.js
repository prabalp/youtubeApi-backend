const express = require("express");
const app = express();
const router = require("express").Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const { db_connect } = require("./db_connection");
const { api_schedule } = require("./api_scheduler");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const videosRouter = require("./routes/videos");

router.use(express.static(__dirname + "/public/"));

//enviromental variables
const URL = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

//routes
app.use("/videos", videosRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("Hello World");
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  db_connect(URL);

  await sleep(5000);
  api_schedule();
});
