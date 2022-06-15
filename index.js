const express = require("express");
const app = express();
const router = require("express").Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const { db_connect } = require("./db_connection");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static(__dirname + "/public/"));

//enviromental variables
const URL = process.env.MONGODB_URI;

app.listen(3000, () => {
  console.log("Listening on port 3000");
  db_connect(URL);
});
