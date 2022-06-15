const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  publishingDateTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Video", VideoSchema);
