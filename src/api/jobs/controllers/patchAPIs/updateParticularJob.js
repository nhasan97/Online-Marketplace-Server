const { ObjectId } = require("mongodb");
const { getDB } = require("../../../../database/connectDatabase");

const updateParticularJob = async (req, res) => {
  try {
    const database = getDB();
    const servicesCollection = database.collection("postedJobs");
    const jobId = req.params.id;
    const filter = { _id: new ObjectId(jobId) };

    const options = { upsert: true };

    const updatedInfo = {
      $set: {
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        deadline: req.body.deadline,
        description: req.body.description,
        category: req.body.category,
        minimumPrice: req.body.minimumPrice,
        maximumPrice: req.body.maximumPrice,
      },
    };

    const result = await servicesCollection.updateOne(
      filter,
      updatedInfo,
      options
    );
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = updateParticularJob;
