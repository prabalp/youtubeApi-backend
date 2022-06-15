const { google } = require("googleapis");
const schedule = require("node-schedule");
const Video = require("./models/videos");
const api_response = async (API_KEY, searchQuerry) => {
  const youtube = google.youtube({
    version: "v3",
    auth: API_KEY,
  });
  try {
    //get the latest video from mongoose
    const video = await Video.find({})
      .sort({ publishingDateTime: -1 })
      .limit(1);
    if (video.length === 0) {
      var max_date = new Date(2022);
    } else {
      var max_date = video[0].publishingDateTime;
    }
    return youtube.search
      .list({
        part: "snippet",
        q: searchQuerry,
        maxResults: 5,
        order: "date",
        publishedAfter: max_date,
      })
      .then((res) => {
        // console.log(res.data.items);
        return res.data.items;
      });
  } catch (error) {
    console.log(error);
  }
};

//make a function to retrive the latestet date from db

module.exports.api_schedule = async () => {
  console.log("api_schedule");
  schedule.scheduleJob("*/10 * * * * *", async () => {
    // console.log("Running API");
    try {
      const API_KEY = process.env.YOUTUBE_API_KEY;
      const searchQuerry = process.env.SEARCH_QUERRY;
      const response = await api_response(API_KEY, searchQuerry);
      for (let i = 0; i < response.length; i++) {
        const video = await Video.find({
          title: response[i].snippet.title,
          description: response[i].snippet.description,
        });

        if (video.length === 0) {
          var new_video = await Video.create({
            title: response[i].snippet.title,
            description: response[i].snippet.description,
            thumbnail: response[i].snippet.thumbnails.default.url,
            publishingDateTime: new Date(response[i].snippet.publishedAt),
          });
          console.log(new_video);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};
