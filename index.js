const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000 || process.env.PORT;

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-eleven-487e9.web.app/",
      "https://assignment-eleven-487e9.firebaseapp.com/",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.user = decoded;
    next();
  });
};

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

    app.get("/jobs/:id", async (req, res) => {
      try {
        const servicesCollection = database.collection("postedJobs");
        const jobId = req.params.id;
        const query = { _id: new ObjectId(jobId) };
        const result = await servicesCollection.findOne(query);
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    app.get("/my-posted-jobs", verifyToken, async (req, res) => {
      try {
        if (req.user.email !== req.query.email) {
          return res.status(403).send({ message: "Forbidden Access" });
        }
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

    app.get("/bids", verifyToken, async (req, res) => {
      try {
        if (req.user.email !== req.query.email) {
          return res.status(403).send({ message: "Forbidden Access" });
        }
        const bidsCollection = database.collection("bids");
        let query = {};
        if (req.query?.email) {
          query = { bidderEmail: req.query.email };
        }
        const cursor = bidsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    app.get("/bid-requests", verifyToken, async (req, res) => {
      try {
        if (req.user.email !== req.query.email) {
          return res.status(403).send({ message: "Forbidden Access" });
        }
        const bidsCollection = database.collection("bids");
        let query = {};
        if (req.query?.email) {
          query = { buyerEmail: req.query.email };
        }
        const cursor = bidsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    //============================== posts ==============================

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ success: true });
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      res.clearCookie("token", { maxAge: 0 }).send({ success: true });
    });

    //-----------------------------------------------

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

    app.post("/bids", async (req, res) => {
      try {
        const bidsCollection = database.collection("bids");
        const postedBid = req.body;
        const result = await bidsCollection.insertOne(postedBid);
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    //============================== patches ==============================

    app.patch("/posted-jobs/:id", async (req, res) => {
      try {
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
    });

    app.patch("/bid-requests/:id", async (req, res) => {
      try {
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
    });

    //============================== deletes ==============================
    app.delete("/posted-jobs/:id", async (req, res) => {
      try {
        const servicesCollection = database.collection("postedJobs");
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await servicesCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

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
