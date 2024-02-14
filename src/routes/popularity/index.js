const express = require("express");

const { getPopularityFromDB } = require("../../api/popularity");

const router = express.Router();

router.get("/popularity", getPopularityFromDB);

module.exports = router;
