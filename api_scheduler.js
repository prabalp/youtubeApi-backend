const { google } = require("googleapis");
const schedule = require("node-schedule");
const Video = require("./models/videos");
const api_response = async (API_KEY, searchQuerry) => {
  const youtube = google.youtube({
    version: "v3",
    auth: API_KEY,
  });
  try {
    return youtube.search
      .list({
        part: "snippet",
        q: searchQuerry,
        maxResults: 5,
        order: "date",
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
        var video = await Video.create({
          title: response[i].snippet.title,
          description: response[i].snippet.description,
          thumbnail: response[i].snippet.thumbnails.default.url,
          publishingDateTime: new Date(response[i].snippet.publishedAt),
        });
        console.log(video);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
