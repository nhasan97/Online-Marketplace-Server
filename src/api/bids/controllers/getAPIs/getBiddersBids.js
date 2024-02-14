const { getDB } = require("../../../../database/connectDatabase");

const getBiddersBids = async (req, res) => {
  try {
    if (req.user.email !== req.query.email) {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    const database = getDB();
    const bidsCollection = database.collection("bids");
    let query = {};
    if (req.query?.email) {
      query = { bidderEmail: req.query.email };
    }
    const cursor = bidsCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = getBiddersBids;
