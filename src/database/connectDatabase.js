require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const getDBUri = () => {
  let DBUri = "";

  if (process.env.NODE_ENVIRONMENT === "development") {
    DBUri = process.env.DB_LOCAL_URI;
    DBUri = DBUri.replace("<username>", process.env.DB_USER);
    DBUri = DBUri.replace("<password>", process.env.DB_PASS);
  } else {
    DBUri = process.env.DB_PROD_URI;
  }

  return DBUri;
};

const client = new MongoClient(getDBUri(), {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const getDB = () => {
  const database = client.db("marketplaceDB");
  return database;
};

const connectDatabase = async () => {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();

  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
};

module.exports = { getDB, connectDatabase };
