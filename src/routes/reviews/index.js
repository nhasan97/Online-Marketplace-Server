const express = require("express");

const { getReviews } = require("../../api/reviews");

const router = express.Router();

router.get("/reviews", getReviews);

module.exports = router;
