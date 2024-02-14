const { getDB } = require("../../../../database/connectDatabase");

const getUsersPostedJobs = async (req, res) => {
  try {
    if (req.user.email !== req.query.email) {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    const database = getDB();
    const servicesCollection = database.collection("postedJobs");
    let query = {};
    if (req.query?.email) {
      query = { email: req.query.email };
    }
    const cursor = servicesCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = getUsersPostedJobs;
