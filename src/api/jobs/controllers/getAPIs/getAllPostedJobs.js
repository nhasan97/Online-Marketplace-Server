const { getDB } = require("../../../../database/connectDatabase");

const getAllPostedJobs = async (req, res) => {
  try {
    const database = getDB();
    const servicesCollection = database.collection("postedJobs");
    const cursor = servicesCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = getAllPostedJobs;
