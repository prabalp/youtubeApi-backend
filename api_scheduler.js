const { google } = require("googleapis");
const schedule = require("node-schedule");
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

module.exports.api_schedule = async () => {
  console.log("api_schedule");
  schedule.scheduleJob("*/1 * * * *", async () => {
    // console.log("Running API");
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const searchQuerry = process.env.SEARCH_QUERRY;
    const response = await api_response(API_KEY, searchQuerry);
    console.log(response);
  });
};
