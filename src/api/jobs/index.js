const getAllPostedJobs = require("./controllers/getAPIs/getAllPostedJobs");
const getParticularJob = require("./controllers/getAPIs/getParticularJob");
const getUsersPostedJobs = require("./controllers/getAPIs/getUsersPostedJobs");
const saveJobInDB = require("./controllers/postAPIs/saveJobInDB");
const updateParticularJob = require("./controllers/patchAPIs/updateParticularJob");
const deleteParticularJob = require("./controllers/deleteAPIs/deleteParticularJob");

module.exports = {
  getAllPostedJobs,
  getParticularJob,
  getUsersPostedJobs,
  saveJobInDB,
  updateParticularJob,
  deleteParticularJob,
};
