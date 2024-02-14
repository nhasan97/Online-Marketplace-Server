const { getDB } = require("../../../../database/connectDatabase");

const updateParticularBid = async (req, res) => {
  try {
    const database = getDB();
    const bidsCollection = database.collection("bids");
    const id = req.params.id;
    const updatedStatus = req.body.status;
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        status: updatedStatus,
      },
    };
    const result = await bidsCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = updateParticularBid;
