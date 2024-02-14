const { getDB } = require("../../../database/connectDatabase");

const getReviews = async (req, res) => {
  try {
    const database = getDB();
    const portfolioCollection = database.collection("portfolio");
    const cursor = portfolioCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = getReviews;
