const { getDB } = require("../../../../database/connectDatabase");

const getParticularJob = async (req, res) => {
  try {
    const database = getDB();
    const servicesCollection = database.collection("postedJobs");
    const jobId = req.params.id;
    const query = { _id: new ObjectId(jobId) };
    const result = await servicesCollection.findOne(query);
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = getParticularJob;
