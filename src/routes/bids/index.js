const express = require("express");

const {
  getBiddersBids,
  getEmployersBidRequests,
  saveBidInDB,
  updateParticularBid,
} = require("../../api/bids");

const verifyToken = require("../../middleWares/verifyToken");

const router = express.Router();

router.get("/bids", verifyToken, getBiddersBids);
router.get("/bid-requests", verifyToken, getEmployersBidRequests);
router.post("/bids", saveBidInDB);
router.patch("/bid-requests/:id", verifyToken, updateParticularBid);

module.exports = router;
