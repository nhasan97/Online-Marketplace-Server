const { getDB } = require("../../../../database/connectDatabase");

const saveBidInDB = async (req, res) => {
  try {
    const database = getDB();
    const bidsCollection = database.collection("bids");
    const postedBid = req.body;
    const result = await bidsCollection.insertOne(postedBid);
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = saveBidInDB;
