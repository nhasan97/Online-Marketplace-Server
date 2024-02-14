const { getDB } = require("../../../../database/connectDatabase");

const deleteParticularJob = async (req, res) => {
  try {
    const database = getDB();
    const servicesCollection = database.collection("postedJobs");
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await servicesCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = deleteParticularJob;
