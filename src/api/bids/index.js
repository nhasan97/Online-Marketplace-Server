const getBiddersBids = require("./controllers/getAPIs/getBiddersBids");
const getEmployersBidRequests = require("./controllers/getAPIs/getEmployersBidRequests");
const saveBidInDB = require("./controllers/postAPIs/saveBidInDB");
const updateParticularBid = require("./controllers/patchAPIs/updateParticularBid");

module.exports = {
  getBiddersBids,
  getEmployersBidRequests,
  saveBidInDB,
  updateParticularBid,
};
