const { getDB } = require("../../../database/connectDatabase");

const getPopularityFromDB = async (req, res) => {
  try {
    const database = getDB();
    const servicesCollection = database.collection("postedJobs");
    const query1 = { category: "Web Development" };
    const result1 = await servicesCollection.countDocuments(query1);
    const query2 = { category: "Digital Marketing" };
    const result2 = await servicesCollection.countDocuments(query2);
    const query3 = { category: "Graphic Design" };
    const result3 = await servicesCollection.countDocuments(query3);
    res.send([
      { name: "Web Development", count: result1 },
      { name: "Digital Marketing", count: result2 },
      { name: "Graphic Design", count: result3 },
    ]);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = getPopularityFromDB;
