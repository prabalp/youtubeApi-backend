const router = require("express").Router();
const { GetVideos, SearchVideos } = require("../controllers/videoController");

router.route("/getVideos").get(GetVideos);
router.route("/searchVideos").post(SearchVideos);

module.exports = router;
