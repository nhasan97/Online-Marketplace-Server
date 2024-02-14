const { getDB } = require("../../../../database/connectDatabase");

const saveJobInDB = async (req, res) => {
  try {
    const database = getDB();
    const servicesCollection = database.collection("postedJobs");
    const postedJob = req.body;
    const result = await servicesCollection.insertOne(postedJob);
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = saveJobInDB;
