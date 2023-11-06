const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = 5000 || process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ygecibd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("server started");
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("marketplaceDB");

    //============================== gets ==============================

    app.get("/posted-jobs", async (req, res) => {
      try {
        const servicesCollection = database.collection("postedJobs");
        const cursor = servicesCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    app.get("/my-posted-jobs", async (req, res) => {
      try {
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
    });

    //============================== posts ==============================

    app.post("/posted-jobs", async (req, res) => {
      try {
        const servicesCollection = database.collection("postedJobs");
        const postedJob = req.body;
        const result = await servicesCollection.insertOne(postedJob);
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    //============================== patches ==============================

    //============================== deletes ==============================

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
