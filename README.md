
# Using Youtube API 

In this project youtube data api has been used to fetch data related to specific search word. MongoDB atlas has been used and the database is updated by the data fetched by tha api per 10 sec. 


## Installation

Clone the git repo in your local machine.

```bash
  git clone https://github.com/prabalp/youtubeApi-backend.git
  cd youtubeApi-backend
```
Install all the dependencies using npm

```bash
  npm install
```
To start the server run 
```bash
  npm start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

`YOUTUBE_API_KEY`

`SEARCH_QUERRY`

`PORT`


## API Reference

#### Get Videos from database

```http
  GET /videos/getVideos
```
NOTE: No autherntication has been added till now, no need to send any JWT or API key

#### Search Videos

```http
  POST /videos/searchVideos/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `searchQuerry`      | `string` | **Required**.  searchQuerry to search |



## Reference

[YouTube data v3 API](https://developers.google.com/youtube/v3/getting-started)

[Search API reference](https://developers.google.com/youtube/v3/docs/search/list)



## MongoDB Atlas 

Just create a cluster and paste the URI in the enviromental variable with proper credentials.

