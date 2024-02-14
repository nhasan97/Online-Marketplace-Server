const { getDB } = require("../../../database/connectDatabase");

const getCategoriesFromDB = async (req, res) => {
  try {
    const database = getDB();
    const categoriesCollection = database.collection("categories");
    const cursor = categoriesCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = getCategoriesFromDB;
