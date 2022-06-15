const Video = require("../models/videos");
const { successmessage, errormessage } = require("../middlewares/utils");

module.exports.GetVideos = async (req, res) => {
  try {
    //find latest 10 documents from mongoose
    const videos = await Video.find({})
      .sort({ publishingDateTime: -1 })
      .limit(10);
    res
      .status(200)
      .json(successmessage("Videos retrieved successfully", videos));
  } catch (error) {
    res.json(errormessage(error));
  }
};

module.exports.SearchVideos = async (req, res) => {
  try {
    const { searchQuerry } = req.body;

    //fulltext search in mongoose
    // const videos = await Video.find({
    //   $text: { $search: searchQuerry },
    // })

    const videos = await Video.find({
      title: { $regex: searchQuerry, $options: "i" },
      desciption: { $regex: searchQuerry, $options: "i" },
    })
      .sort({ publishingDateTime: -1 })
      .limit(10);
    res.status(200).json(successmessage("Videos found successfully", videos));
  } catch (error) {
    res.json(errormessage(error));
  }
};
