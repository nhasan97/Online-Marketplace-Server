const express = require("express");

const {
  getAllPostedJobs,
  getParticularJob,
  getUsersPostedJobs,
  saveJobInDB,
  updateParticularJob,
  deleteParticularJob,
} = require("../../api/jobs");

const verifyToken = require("../../middleWares/verifyToken");

const router = express.Router();

router.get("/posted-jobs", getAllPostedJobs);
router.get("/jobs/:id", getParticularJob);
router.get("/my-posted-jobs", verifyToken, getUsersPostedJobs);
router.post("/posted-jobs", saveJobInDB);
router.patch("/posted-jobs/:id", updateParticularJob);
router.delete("/posted-jobs/:id", deleteParticularJob);

module.exports = router;
